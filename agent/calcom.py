import os
import re
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode
from zoneinfo import ZoneInfo

import httpx

CAL_API = "https://api.cal.com/v2"
SLOT_VERSION = "2024-09-04"
BOOKING_VERSION = "2024-08-13"

# Visitor-local windows as (start_minute, end_minute exclusive).
# 4:00pm is evening, not afternoon. 6:00pm is included in evening.
PART_OF_DAY_HOURS = {
    "morning": (9 * 60, 12 * 60),
    "afternoon": (12 * 60, 16 * 60),
    "evening": (16 * 60, 18 * 60 + 1),
}


def _headers(version: str) -> dict[str, str]:
    headers = {
        "cal-api-version": version,
        "Content-Type": "application/json",
    }
    api_key = os.getenv("CALCOM_API_KEY", "").strip()
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    return headers


def _identity() -> tuple[str, str]:
    username = os.getenv("CALCOM_USERNAME", "").strip()
    slug = os.getenv("CALCOM_EVENT_SLUG", "").strip()
    link = os.getenv("NEXT_PUBLIC_CAL_LINK", "").strip()
    if (not username or not slug) and "/" in link:
        username, slug = link.split("/", 1)
    return username, slug


def _zone(time_zone: str) -> ZoneInfo:
    try:
        return ZoneInfo(time_zone or "America/New_York")
    except Exception:
        return ZoneInfo("America/New_York")


def _parse_iso(value: str) -> datetime | None:
    text = (value or "").strip()
    if not text:
        return None
    try:
        return datetime.fromisoformat(text.replace("Z", "+00:00"))
    except ValueError:
        return None


def _as_local(slot: str, time_zone: str) -> datetime | None:
    dt = _parse_iso(slot)
    if dt is None:
        return None
    tz = _zone(time_zone)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=tz)
    return dt.astimezone(tz)


def _normalize_part_of_day(value: str) -> str:
    text = (value or "").strip().lower()
    if text in PART_OF_DAY_HOURS:
        return text
    if text.startswith("morn"):
        return "morning"
    if text.startswith("aft"):
        return "afternoon"
    if text.startswith("eve"):
        return "evening"
    return ""


def _parse_preferred_time(value: str) -> tuple[int, int | None] | None:
    text = (value or "").strip().lower().replace(" ", "")
    if not text:
        return None
    meridiem = None
    if text.endswith(("a.m.", "am")):
        meridiem = "am"
        text = text[: text.rfind("a")]
    elif text.endswith(("p.m.", "pm")):
        meridiem = "pm"
        text = text[: text.rfind("p")]
    match = re.fullmatch(r"(\d{1,2})(?::(\d{2}))?", text)
    if not match:
        return None
    hour = int(match.group(1))
    minute = int(match.group(2)) if match.group(2) is not None else None
    if meridiem == "am":
        if hour == 12:
            hour = 0
    elif meridiem == "pm":
        if hour != 12:
            hour += 12
    if hour > 23 or (minute is not None and minute > 59):
        return None
    return hour, minute


def _window_hours(part_of_day: str, preferred_time: str) -> tuple[int, int] | None:
    preferred = _parse_preferred_time(preferred_time)
    if preferred:
        hour, minute = preferred
        start_min = hour * 60 + (minute or 0)
        # 3pm / 15:00 means that hour; 3:30 means that exact start.
        span = 1 if minute not in (None, 0) else 60
        return start_min, start_min + span
    return PART_OF_DAY_HOURS.get(_normalize_part_of_day(part_of_day))


def _flatten_slots(payload: dict) -> list[str]:
    slots: list[str] = []
    data = payload.get("data") or payload.get("slots") or payload
    if isinstance(data, dict):
        for key, value in data.items():
            if not isinstance(value, list):
                continue
            for item in value:
                if isinstance(item, str):
                    if "T" in item or item.endswith("Z"):
                        slots.append(item)
                    elif re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(key)):
                        slots.append(f"{key}T{item}")
                    else:
                        slots.append(item)
                elif isinstance(item, dict):
                    start = item.get("start") or item.get("time")
                    if start:
                        slots.append(str(start))
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and item.get("start"):
                slots.append(str(item["start"]))
    return slots


def _filter_slots(slots: list[str], time_zone: str, part_of_day: str, preferred_time: str) -> list[str]:
    bounds = _window_hours(part_of_day, preferred_time)
    if bounds is None:
        return slots
    start_min, end_min = bounds
    matched: list[str] = []
    for slot in slots:
        local = _as_local(slot, time_zone)
        if local is None:
            continue
        minutes = local.hour * 60 + local.minute
        if start_min <= minutes < end_min:
            matched.append(slot)
    return matched


def _query_range(
    start: str | None,
    end: str | None,
    time_zone: str,
    part_of_day: str,
    preferred_time: str,
) -> tuple[str, str]:
    now = datetime.now(_zone(time_zone))
    start_date = start or now.date().isoformat()
    end_date = end or (start if start else (now + timedelta(days=10)).date().isoformat())
    bounds = _window_hours(part_of_day, preferred_time)
    if bounds is None or start_date != end_date:
        return start_date, end_date

    start_min, end_min = bounds
    year, month, day = (int(part) for part in start_date.split("-"))
    tz = _zone(time_zone)
    start_local = datetime(year, month, day, start_min // 60, start_min % 60, tzinfo=tz)
    end_hour, end_minute = divmod(end_min, 60)
    if end_hour >= 24:
        end_local = datetime(year, month, day, 23, 59, 59, tzinfo=tz)
    else:
        end_local = datetime(year, month, day, end_hour, end_minute, tzinfo=tz)
    return (
        start_local.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        end_local.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    )


def _label_request(start: str | None, end: str | None, time_zone: str, part_of_day: str, preferred_time: str) -> str:
    window = _normalize_part_of_day(part_of_day)
    preferred = (preferred_time or "").strip()
    when = start or "the next several days"
    if start and end and start != end:
        when = f"{start} to {end}"
    elif start:
        when = start
    detail = preferred or window or "any time"
    return f"{detail} on {when} ({time_zone})"


async def _slot_starts(
    start: str | None,
    end: str | None,
    time_zone: str,
    part_of_day: str = "",
    preferred_time: str = "",
) -> tuple[list[str], str]:
    username, slug = _identity()
    if not username or not slug:
        return [], "Scheduling is not configured. Invite them to tap Let's Talk on the site to open the calendar popup."

    query_start, query_end = _query_range(start, end, time_zone, part_of_day, preferred_time)
    query = urlencode(
        {
            "username": username,
            "eventTypeSlug": slug,
            "start": query_start,
            "end": query_end,
            "timeZone": time_zone,
            "format": "range",
        }
    )
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(f"{CAL_API}/slots?{query}", headers=_headers(SLOT_VERSION))
    if response.status_code >= 400:
        return [], f"Cal.com availability lookup failed ({response.status_code}). Tell them to use Let's Talk on the site instead of guessing times."

    slots = _flatten_slots(response.json())[:120]
    if not slots:
        return [], (
            f"No open slots for {_label_request(start, end, time_zone, part_of_day, preferred_time)}. "
            "Do not invent a time. Say that window is not free, then ask about another time with different wording than last turn, or offer Let's Talk on the site."
        )
    return slots, ""


def _format_offer(slots: list[str], matched_request: bool = False) -> str:
    offered = slots[:3]
    more = " More times exist; if they want a different window, search again." if len(slots) > 3 else ""
    if matched_request:
        next_step = (
            "These times match what they asked for. Tell them it is available, conversationally. "
            "Ask if they want to proceed. Do not also ask about another time this turn. "
            "Vary your wording from the previous message."
        )
    else:
        next_step = (
            "Offer at most these 3 exact start times. Never invent a slot. "
            "Then ask if there is some other time you could look into for them, using fresh wording. "
            "Do not copy the tone of your last message."
        )
    return f"{next_step}{more}\n" + "\n".join(f"- {slot}" for slot in offered)


async def get_available_slots(
    start: str | None = None,
    end: str | None = None,
    time_zone: str = "America/New_York",
    part_of_day: str = "",
    preferred_time: str = "",
) -> str:
    slots, error = await _slot_starts(start, end, time_zone, part_of_day, preferred_time)
    if error:
        return error

    matched = _filter_slots(slots, time_zone, part_of_day, preferred_time)
    requested = _normalize_part_of_day(part_of_day) or (preferred_time or "").strip()
    if requested and not matched:
        alternatives = slots[:3]
        listed = "\n".join(f"- {slot}" for slot in alternatives)
        return (
            f"Cal.com has no slots matching {_label_request(start, end, time_zone, part_of_day, preferred_time)}. "
            "Do not assume that time is free. Tell them it is not available. "
            "You may offer at most 3 of these other real slots, then ask if another time would help, with different wording than last turn.\n"
            f"{listed}"
        )
    return _format_offer(matched or slots, matched_request=bool(requested and matched))


async def schedule_call(
    start: str,
    attendee_name: str,
    attendee_email: str,
    time_zone: str = "America/New_York",
) -> str:
    username, slug = _identity()
    if not username or not slug:
        return "Scheduling is not configured. Ask them to use Let's Talk on the site."

    local = _as_local(start, time_zone)
    day = local.date().isoformat() if local else None
    slots, error = await _slot_starts(day, day, time_zone)
    if error:
        return error
    if start not in slots:
        listed = "\n".join(f"- {slot}" for slot in slots[:3])
        return (
            "That time is not available. Do not book it. "
            f"Share at most these 3 slots, then ask if another time would help:\n{listed}"
        )

    body = {
        "start": start,
        "eventTypeSlug": slug,
        "username": username,
        "attendee": {
            "name": attendee_name,
            "email": attendee_email,
            "timeZone": time_zone,
            "language": "en",
        },
    }
    event_type_id = os.getenv("CALCOM_EVENT_TYPE_ID", "").strip()
    if event_type_id:
        body["eventTypeId"] = int(event_type_id)

    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post(
            f"{CAL_API}/bookings",
            headers=_headers(BOOKING_VERSION),
            json=body,
        )
    if response.status_code >= 400:
        return (
            f"Booking failed ({response.status_code}). Do not claim it is booked. "
            "Ask them to pick another listed slot or use Let's Talk."
        )

    data = response.json().get("data") or response.json()
    start_time = data.get("start") or start
    return (
        f"Booking confirmed for {start_time}. Tell them it is on the calendar. "
        "Do not share Saumay's email, phone, or other contact details."
    )
