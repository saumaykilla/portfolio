import os
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode

import httpx

CAL_API = "https://api.cal.com/v2"
SLOT_VERSION = "2024-09-04"
BOOKING_VERSION = "2024-08-13"


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


def _flatten_slots(payload: dict) -> list[str]:
    slots: list[str] = []
    data = payload.get("data") or payload.get("slots") or payload
    if isinstance(data, dict):
        for value in data.values():
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, str):
                        slots.append(item)
                    elif isinstance(item, dict):
                        start = item.get("start") or item.get("time")
                        if start:
                            slots.append(str(start))
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and item.get("start"):
                slots.append(str(item["start"]))
    return slots[:12]


async def _slot_starts(start: str | None, end: str | None, time_zone: str) -> tuple[list[str], str]:
    username, slug = _identity()
    if not username or not slug:
        return [], "Scheduling is not configured. Invite them to tap Let's Talk on the site to open the calendar popup."

    now = datetime.now(timezone.utc)
    start_date = start or now.date().isoformat()
    end_date = end or (now + timedelta(days=10)).date().isoformat()
    query = urlencode(
        {
            "username": username,
            "eventTypeSlug": slug,
            "start": start_date,
            "end": end_date,
            "timeZone": time_zone,
            "format": "range",
        }
    )
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(f"{CAL_API}/slots?{query}", headers=_headers(SLOT_VERSION))
    if response.status_code >= 400:
        return [], f"Cal.com availability lookup failed ({response.status_code}). Tell them to use Let's Talk on the site instead of guessing times."

    slots = _flatten_slots(response.json())
    if not slots:
        return [], f"No open slots between {start_date} and {end_date} in {time_zone}. Offer another date range or Let's Talk on the site."
    return slots, ""


async def get_available_slots(start: str | None = None, end: str | None = None, time_zone: str = "America/New_York") -> str:
    slots, error = await _slot_starts(start, end, time_zone)
    if error:
        return error
    return "Only offer these exact start times. Never invent a slot.\n" + "\n".join(f"- {slot}" for slot in slots)


async def schedule_call(
    start: str,
    attendee_name: str,
    attendee_email: str,
    time_zone: str = "America/New_York",
) -> str:
    username, slug = _identity()
    if not username or not slug:
        return "Scheduling is not configured. Ask them to use Let's Talk on the site."

    slots, error = await _slot_starts(None, None, time_zone)
    if error:
        return error
    if start not in slots:
        listed = "\n".join(f"- {slot}" for slot in slots)
        return (
            "That time is not available. Do not book it. "
            f"Share only these slots:\n{listed}"
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
