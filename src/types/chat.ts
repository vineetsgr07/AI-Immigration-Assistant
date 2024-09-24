export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string; // Change this to string for easier serialization
}

export interface Card {
  id: string;
  title: string;
  content: string;
}

export interface ChatState {
  immigrationMessages: Message[];
  generalMessages: Message[];
  immigrationCards: Card[];
  generalCards: Card[];
  isLoading: boolean;
  error: string | null;
  activeContext: 'immigration' | 'general';
}

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: { message: Message; context: 'immigration' | 'general' } }
  | { type: 'ADD_CARD'; payload: { card: Card; context: 'immigration' | 'general' } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CHAT'; payload: 'immigration' | 'general' }
  | { type: 'SET_ACTIVE_CONTEXT'; payload: 'immigration' | 'general' }
  | { type: 'LOAD_STATE'; payload: ChatState };

  export interface ChatInterfaceProps {
    botType: 'immigration' | 'general';
  }
  