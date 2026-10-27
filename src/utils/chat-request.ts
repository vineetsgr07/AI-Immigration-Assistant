// src/utils/chat-request.ts
export const MAX_QUESTION_LENGTH = 4000;

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export type ChatRequestResult =
  | { ok: true; messages: ChatMessage[]; userMessage: string }
  | { ok: false; error: string };

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== 'object') return false;
  const { role, parts } = value as { role?: unknown; parts?: unknown };
  return (
    (role === 'user' || role === 'model') &&
    Array.isArray(parts) &&
    parts.length > 0 &&
    parts.every((part) => !!part && typeof (part as { text?: unknown }).text === 'string')
  );
};

// Checks the body sent to /api/chat before anything reaches Gemini.
export const parseChatRequest = (body: unknown): ChatRequestResult => {
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: 'Request must include a non-empty messages array.' };
  }
  if (!messages.every(isChatMessage)) {
    return { ok: false, error: 'Each message needs a role of "user" or "model" and text parts.' };
  }

  const last = messages[messages.length - 1];
  const userMessage = last.parts[0].text.trim();
  if (last.role !== 'user' || !userMessage) {
    return { ok: false, error: 'The last message must be a non-empty question from the user.' };
  }
  if (userMessage.length > MAX_QUESTION_LENGTH) {
    return { ok: false, error: `Questions can be up to ${MAX_QUESTION_LENGTH} characters.` };
  }

  return { ok: true, messages, userMessage };
};
