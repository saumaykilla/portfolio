"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  RoomAudioRenderer,
  RoomContext,
  useLocalParticipant,
  useTrackTranscription,
  useTranscriptions,
  useVoiceAssistant,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useMotion } from "@/components/motion/MotionProvider";

const TIP_KEY = "sk-agent-tip-v1";

const GREETING: ChatLine = {
  id: "greeting",
  role: "agent",
  text: "Hi, how can I help you today? I can talk about Saumay's work, projects, and skills, or help book a call.",
};

type ChatLine = {
  id: string;
  role: "user" | "agent";
  text: string;
  streaming?: boolean;
  source?: "typed" | "voice";
};

function normalizeChatText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function textsOverlap(a: string, b: string) {
  const left = normalizeChatText(a);
  const right = normalizeChatText(b);
  if (!left || !right) return false;
  return left === right || left.includes(right) || right.includes(left);
}

function isGreetingUtterance(text: string) {
  const value = normalizeChatText(text);
  const greeting = normalizeChatText(GREETING.text);
  if (!value) return false;
  if (value === greeting) return true;
  if (greeting.includes(value) && value.length >= 12) return true;
  return value.startsWith(greeting) && value.length <= greeting.length + 24;
}

type ConnectionDetails = {
  serverUrl: string;
  participantToken: string;
};

export function AgentWidget() {
  const { overlay, introDone, introPlaying } = useMotion();
  const hidden = overlay === "modal" || (introPlaying && !introDone);
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [room] = useState(() => new Room());
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(false);
  const [awaitingReply, setAwaitingReply] = useState(false);
  const [turn, setTurn] = useState(0);
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<ChatLine[]>([GREETING]);
  const connectingRef = useRef(false);

  useEffect(() => {
    setShowTip(window.localStorage.getItem(TIP_KEY) !== "1");
  }, []);

  const connect = useCallback(async () => {
    if (connected || connectingRef.current) return;
    connectingRef.current = true;
    setConnecting(true);
    setError(null);
    try {
      const response = await fetch("/api/livekit/token", { method: "POST" });
      const payload = (await response.json()) as ConnectionDetails & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not start the assistant.");
      }
      await room.connect(payload.serverUrl, payload.participantToken);
      setConnected(true);
      setTurn((value) => value + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the assistant.");
    } finally {
      connectingRef.current = false;
      setConnecting(false);
    }
  }, [connected, room]);

  const muteMic = useCallback(() => {
    setVoiceOn(false);
    if (room.localParticipant) {
      void room.localParticipant.setMicrophoneEnabled(false);
    }
  }, [room]);

  useEffect(() => {
    return () => {
      void room.disconnect();
    };
  }, [room]);

  useEffect(() => {
    if (!open || connected || error) return;
    void connect();
  }, [open, connected, error, connect]);

  const sendChat = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setLines((current) => [
        ...current,
        { id: `user-${Date.now()}`, role: "user", text: trimmed, source: "typed" },
      ]);
      setDraft("");
      setAwaitingReply(true);
      setTurn((value) => value + 1);
      if (!connected) {
        setError("Give me a second to connect, then send that again.");
        return;
      }
      await room.localParticipant.sendText(trimmed, { topic: "lk.chat" });
    },
    [connected, room],
  );

  const toggleVoice = useCallback(async () => {
    if (!connected) {
      await connect();
    }
    const next = !voiceOn;
    await room.localParticipant.setMicrophoneEnabled(next);
    setVoiceOn(next);
  }, [connect, connected, room, voiceOn]);

  const close = useCallback(() => {
    setOpen(false);
    setAwaitingReply(false);
    setLines((current) =>
      current.map((line) => (line.streaming ? { ...line, streaming: false } : line)),
    );
    muteMic();
  }, [muteMic]);

  const dismissTip = useCallback(() => {
    window.localStorage.setItem(TIP_KEY, "1");
    setShowTip(false);
  }, []);

  if (hidden) return null;

  return (
    <>
      {open ? (
        <div
          className="pointer-events-auto fixed inset-0 z-[10000]"
          aria-hidden
          onClick={close}
        />
      ) : null}

      <div className="pointer-events-none fixed bottom-5 right-5 z-[10001] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="pointer-events-auto w-[min(100vw-2.5rem,380px)] overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-[0_24px_80px_rgba(28,22,18,0.22)]"
          >
            <RoomContext.Provider value={room}>
              <RoomAudioRenderer />
              <WidgetPanel
                connecting={connecting}
                connected={connected}
                error={error}
                voiceOn={voiceOn}
                draft={draft}
                lines={lines}
                awaitingReply={awaitingReply}
                turn={turn}
                setDraft={setDraft}
                setLines={setLines}
                setAwaitingReply={setAwaitingReply}
                setTurn={setTurn}
                onClose={close}
                onRetry={() => void connect()}
                onSend={(event) => {
                  event.preventDefault();
                  void sendChat(draft);
                }}
                onToggleVoice={() => void toggleVoice()}
              />
            </RoomContext.Provider>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {showTip && !open ? (
          <div
            role="status"
            className="pointer-events-auto flex max-w-[min(70vw,220px)] items-center gap-1 rounded-full bg-ink py-1 pl-3 pr-1 text-[11px] font-medium tracking-wide text-cream shadow-[0_8px_20px_rgba(28,22,18,0.2)]"
          >
            <span>Ask about my work</span>
            <button
              type="button"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-cream/70 hover:bg-white/10 hover:text-cream"
              aria-label="Dismiss tip"
              onClick={dismissTip}
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ) : null}

      <button
        type="button"
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta text-white shadow-[0_12px_32px_rgba(196,90,56,0.38)] transition hover:bg-terracotta-dark"
        aria-label={open ? "Close assistant" : "Ask about my work"}
        onClick={() => {
          if (open) close();
          else setOpen(true);
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
            <path
              d="M5 11a7 7 0 0 1 14 0v2a3 3 0 0 1-3 3h-1v-5h4M5 13v-2a7 7 0 0 1 .4-2.3M8 16v1a4 4 0 0 0 8 0"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 8v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        )}
      </button>
      </div>
      </div>
    </>
  );
}

function WidgetPanel({
  connecting,
  connected,
  error,
  voiceOn,
  draft,
  lines,
  awaitingReply,
  turn,
  setDraft,
  setLines,
  setAwaitingReply,
  setTurn,
  onClose,
  onRetry,
  onSend,
  onToggleVoice,
}: {
  connecting: boolean;
  connected: boolean;
  error: string | null;
  voiceOn: boolean;
  draft: string;
  lines: ChatLine[];
  awaitingReply: boolean;
  turn: number;
  setDraft: (value: string) => void;
  setLines: React.Dispatch<React.SetStateAction<ChatLine[]>>;
  setAwaitingReply: (value: boolean) => void;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onRetry: () => void;
  onSend: (event: FormEvent) => void;
  onToggleVoice: () => void;
}) {
  const { state, agentTranscriptions } = useVoiceAssistant();
  const { localParticipant, microphoneTrack } = useLocalParticipant();
  const transcriptions = useTranscriptions();
  const localMic = useMemo(
    () =>
      microphoneTrack
        ? {
            participant: localParticipant,
            publication: microphoneTrack,
            source: Track.Source.Microphone,
          }
        : undefined,
    [localParticipant, microphoneTrack],
  );
  const { segments: localTrackTranscripts } = useTrackTranscription(localMic);
  const scroller = useRef<HTMLDivElement>(null);
  const knownAtTurn = useRef(
    new Set(lines.filter((line) => line.role === "agent").map((line) => line.id)),
  );
  const finalizedUser = useRef(
    new Set(
      lines.filter((line) => line.role === "user" && !line.streaming).map((line) => line.id),
    ),
  );
  const lastTurn = useRef(turn);
  const sawAgentWork = useRef(false);
  const userSegments = useMemo(() => {
    const incoming: { id: string; text: string; final: boolean }[] = [];
    for (const stream of transcriptions) {
      const trackId = stream.streamInfo.attributes?.["lk.transcribed_track_id"];
      const fromUser =
        stream.participantInfo.identity === localParticipant.identity ||
        Boolean(trackId && microphoneTrack?.trackSid && trackId === microphoneTrack.trackSid);
      if (!fromUser) continue;
      const rawId = stream.streamInfo.attributes?.["lk.segment_id"] ?? stream.streamInfo.id;
      const text = stream.text ?? "";
      if (!text.trim()) continue;
      incoming.push({
        id: `user-${rawId}`,
        text,
        final: stream.streamInfo.attributes?.["lk.transcription_final"] === "true",
      });
    }
    for (const segment of localTrackTranscripts) {
      const text = segment.text ?? "";
      if (!text.trim()) continue;
      incoming.push({
        id: `user-${segment.id}`,
        text,
        final: Boolean(segment.final),
      });
    }

    const collapsed: { id: string; text: string; final: boolean }[] = [];
    for (const segment of incoming) {
      const existing = collapsed.find((item) => textsOverlap(item.text, segment.text));
      if (!existing) {
        collapsed.push({ ...segment });
        continue;
      }
      if (segment.text.length > existing.text.length) existing.text = segment.text;
      if (segment.final) existing.final = true;
    }
    return collapsed;
  }, [localParticipant.identity, localTrackTranscripts, microphoneTrack?.trackSid, transcriptions]);
  const streamKey = [
    ...(agentTranscriptions ?? []).map((segment) => `${segment.id}:${segment.text}`),
    ...userSegments.map((segment) => `${segment.id}:${segment.text}:${segment.final}`),
  ].join("|");
  const agentStreaming = lines.some(
    (line) => line.role === "agent" && line.id !== "greeting" && line.streaming,
  );
  const userStreaming = lines.some((line) => line.role === "user" && line.streaming);
  const hasUserTurn = lines.some((line) => line.role === "user");
  const showThinking =
    !error &&
    connected &&
    hasUserTurn &&
    !agentStreaming &&
    !userStreaming &&
    state !== "speaking" &&
    (state === "thinking" || awaitingReply);

  useEffect(() => {
    if (lastTurn.current === turn) return;
    lastTurn.current = turn;
    knownAtTurn.current = new Set((agentTranscriptions ?? []).map((segment) => segment.id));
  }, [agentTranscriptions, turn]);

  useEffect(() => {
    const segments = agentTranscriptions ?? [];
    if (!segments.length) return;

    let sawFresh = false;
    setLines((current) => {
      let next = current;
      let changed = false;

      for (const segment of segments) {
        const text = segment.text ?? "";
        if (!text.trim()) continue;
        if (isGreetingUtterance(text)) continue;

        const fresh = !knownAtTurn.current.has(segment.id);
        const line: ChatLine = {
          id: segment.id,
          role: "agent",
          text,
          streaming: !segment.final,
        };
        const index = next.findIndex((item) => item.id === segment.id);
        if (index === -1) {
          if (!changed) next = [...next];
          next.push(line);
          changed = true;
          if (fresh) sawFresh = true;
          continue;
        }
        if (next[index].id === "greeting") continue;
        const existing = next[index];
        if (existing.text === line.text && existing.streaming === line.streaming) continue;
        if (!changed) next = [...next];
        next[index] = line;
        changed = true;
        if (fresh) sawFresh = true;
      }

      return changed ? next : current;
    });
    if (sawFresh) setAwaitingReply(false);
  }, [agentTranscriptions, setAwaitingReply, setLines]);

  useEffect(() => {
    let becameFinal = false;
    setLines((current) => {
      let next = current;
      let changed = false;

      for (const segment of userSegments) {
        const line: ChatLine = {
          id: segment.id,
          role: "user",
          text: segment.text,
          streaming: !segment.final,
          source: "voice",
        };
        const index = next.findIndex((item) => {
          if (item.role !== "user") return false;
          if (item.id === line.id) return true;
          if (item.source === "typed") return false;
          return textsOverlap(item.text, line.text);
        });
        if (index === -1) {
          if (!changed) next = [...next];
          next.push(line);
          changed = true;
        } else {
          const existing = next[index];
          const nextText =
            line.text.length >= existing.text.length ? line.text : existing.text;
          const nextStreaming = existing.streaming === false ? false : line.streaming;
          if (existing.text === nextText && existing.streaming === nextStreaming) {
            // keep going so finals still get tracked
          } else {
            if (!changed) next = [...next];
            next[index] = {
              ...existing,
              text: nextText,
              streaming: nextStreaming,
            };
            changed = true;
          }
        }
        if (segment.final && !finalizedUser.current.has(segment.id)) {
          finalizedUser.current.add(segment.id);
          becameFinal = true;
        }
      }

      return changed ? next : current;
    });
    if (becameFinal) {
      setAwaitingReply(true);
      setTurn((value) => value + 1);
    }
  }, [setAwaitingReply, setLines, setTurn, userSegments]);

  useEffect(() => {
    if (state === "thinking" || state === "speaking") sawAgentWork.current = true;
    if (state === "speaking") setAwaitingReply(false);
    if (state === "listening" && sawAgentWork.current) {
      sawAgentWork.current = false;
      setAwaitingReply(false);
    }
  }, [setAwaitingReply, state]);

  useEffect(() => {
    if (state !== "listening") return;
    setLines((current) => {
      if (!current.some((line) => line.role === "agent" && line.streaming)) return current;
      return current.map((line) =>
        line.role === "agent" && line.streaming ? { ...line, streaming: false } : line,
      );
    });
  }, [setLines, state]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines, showThinking, streamKey]);

  const status = useMemo(() => {
    if (error) return error;
    if (connecting) return "Connecting…";
    if (!connected) return "Starting a private room…";
    if (state === "speaking") return "Speaking";
    if (state === "listening") return voiceOn ? "Listening" : "Chat ready";
    if (state === "thinking") return "Thinking";
    return "Online";
  }, [connected, connecting, error, state, voiceOn]);

  return (
    <div className="flex h-[min(70vh,520px)] flex-col">
      <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3">
        <div>
          <p className="font-display text-sm font-semibold text-ink">Chat</p>
          <p className="text-[11px] text-muted">{error ? "Couldn't connect" : status}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:bg-ink/5"
          aria-label="Close assistant"
        >
          ×
        </button>
      </div>

      <div
        ref={scroller}
        data-native-scroll
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {error ? (
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-cream-2 px-3 py-3 text-[13px] leading-relaxed text-ink shadow-[0_6px_18px_rgba(28,22,18,0.06)]">
            <p>{error}</p>
            <button
              type="button"
              onClick={onRetry}
              disabled={connecting}
              className="rounded-full bg-ink px-3 py-1.5 text-[11px] font-medium text-cream disabled:opacity-50"
            >
              {connecting ? "Retrying…" : "Retry"}
            </button>
          </div>
        ) : null}
        {lines.map((line) => (
          <div
            key={line.id}
            className={cn("flex", line.role === "user" ? "justify-end" : "justify-start")}
          >
            <p
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed",
                line.role === "user"
                  ? "bg-terracotta text-white"
                  : "bg-cream-2 text-ink shadow-[0_6px_18px_rgba(28,22,18,0.06)]",
              )}
            >
              {line.text}
              {line.streaming ? (
                <span
                  className={cn(
                    "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse",
                    line.role === "user" ? "bg-white" : "bg-terracotta",
                  )}
                />
              ) : null}
            </p>
          </div>
        ))}
        {showThinking ? (
          <div className="flex justify-start" aria-live="polite" aria-label="Assistant is thinking">
            <div className="chat-dots flex items-center gap-1 rounded-2xl bg-cream-2 px-3 py-2.5 shadow-[0_6px_18px_rgba(28,22,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/45" />
            </div>
          </div>
        ) : null}
      </div>

      <form onSubmit={onSend} className="border-t border-ink/8 p-3">
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={onToggleVoice}
            aria-pressed={voiceOn}
            aria-label={voiceOn ? "Turn microphone off" : "Talk with voice"}
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition",
              voiceOn
                ? "border-terracotta bg-terracotta text-white"
                : "border-ink/10 bg-white text-ink/70 hover:border-terracotta hover:text-terracotta",
            )}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
              <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
              <path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => event.stopPropagation()}
            placeholder="Ask about projects, work, skills…"
            className="h-11 flex-1 rounded-full border border-ink/10 bg-white px-4 text-sm text-ink outline-none placeholder:text-muted focus:border-terracotta"
          />
          <button
            type="submit"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-cream"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
