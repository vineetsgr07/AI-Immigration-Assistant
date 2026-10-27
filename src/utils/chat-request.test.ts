// chat-request.test.ts
import { MAX_QUESTION_LENGTH, parseChatRequest } from './chat-request';

const user = (text: string) => ({ role: 'user', parts: [{ text }] });
const model = (text: string) => ({ role: 'model', parts: [{ text }] });

describe('parseChatRequest', () => {
  it('accepts a history that ends with a user question', () => {
    const result = parseChatRequest({ messages: [user('Hi'), model('Hello!'), user('  What is a study permit?  ')] });
    expect(result).toEqual({
      ok: true,
      messages: [user('Hi'), model('Hello!'), user('  What is a study permit?  ')],
      userMessage: 'What is a study permit?',
    });
  });

  it.each([
    ['no body', null],
    ['a string body', 'hello'],
    ['missing messages', {}],
    ['an empty messages array', { messages: [] }],
  ])('rejects %s', (_label, body) => {
    expect(parseChatRequest(body)).toEqual({ ok: false, error: 'Request must include a non-empty messages array.' });
  });

  it.each([
    ['an unknown role', { role: 'system', parts: [{ text: 'x' }] }],
    ['no parts', { role: 'user', parts: [] }],
    ['a part without text', { role: 'user', parts: [{}] }],
    ['a non-object message', 'hello'],
  ])('rejects a message with %s', (_label, message) => {
    const result = parseChatRequest({ messages: [message] });
    expect(result.ok).toBe(false);
  });

  it('rejects a history that ends with the model', () => {
    expect(parseChatRequest({ messages: [user('Hi'), model('Hello!')] })).toEqual({
      ok: false,
      error: 'The last message must be a non-empty question from the user.',
    });
  });

  it('rejects a blank question', () => {
    expect(parseChatRequest({ messages: [user('   ')] }).ok).toBe(false);
  });

  it('rejects a question over the length limit', () => {
    expect(parseChatRequest({ messages: [user('a'.repeat(MAX_QUESTION_LENGTH))] }).ok).toBe(true);
    expect(parseChatRequest({ messages: [user('a'.repeat(MAX_QUESTION_LENGTH + 1))] })).toEqual({
      ok: false,
      error: `Questions can be up to ${MAX_QUESTION_LENGTH} characters.`,
    });
  });
});
