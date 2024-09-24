export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean};