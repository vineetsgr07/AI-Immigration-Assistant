// src/contexts/ChatContext.tsx

"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, Dispatch } from 'react';

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

interface ChatState {
  immigrationMessages: Message[];
  generalMessages: Message[];
  immigrationCards: Card[];
  generalCards: Card[];
  isLoading: boolean;
  error: string | null;
  activeContext: 'immigration' | 'general';
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: { message: Message; context: 'immigration' | 'general' } }
  | { type: 'ADD_CARD'; payload: { card: Card; context: 'immigration' | 'general' } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CHAT'; payload: 'immigration' | 'general' }
  | { type: 'SET_ACTIVE_CONTEXT'; payload: 'immigration' | 'general' }
  | { type: 'LOAD_STATE'; payload: ChatState };

const initialState: ChatState = {
  immigrationMessages: [],
  generalMessages: [],
  immigrationCards: [],
  generalCards: [],
  isLoading: false,
  error: null,
  activeContext: 'immigration',
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        [`${action.payload.context}Messages`]: [
          ...state[`${action.payload.context}Messages`],
          action.payload.message,
        ],
      };
    case 'ADD_CARD':
      return {
        ...state,
        [`${action.payload.context}Cards`]: [
          ...state[`${action.payload.context}Cards`],
          action.payload.card,
        ],
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_CHAT':
      return {
        ...state,
        [`${action.payload}Messages`]: [],
        [`${action.payload}Cards`]: [],
      };
    case 'SET_ACTIVE_CONTEXT':
      return { ...state, activeContext: action.payload };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
};

const ChatContext = createContext<{
  state: ChatState;
  dispatch: Dispatch<ChatAction>;
} | undefined>(undefined);

const loadState = (): ChatState => {
  if (typeof window === 'undefined') {
    return initialState;
  }
  const savedState = localStorage.getItem('chatState');
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      // No need to convert timestamp strings back to Date objects
      return parsedState;
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }
  return initialState;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, loadState());

  useEffect(() => {
    const handleStorage = () => {
      dispatch({ type: 'LOAD_STATE', payload: loadState() });
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const stateToSave = {
      ...state,
      immigrationMessages: state.immigrationMessages.map(msg => ({
        ...msg,
        timestamp: typeof msg.timestamp === 'string' ? msg.timestamp : new Date(msg.timestamp).toISOString()
      })),
      generalMessages: state.generalMessages.map(msg => ({
        ...msg,
        timestamp: typeof msg.timestamp === 'string' ? msg.timestamp : new Date(msg.timestamp).toISOString()
      }))
    };
    localStorage.setItem('chatState', JSON.stringify(stateToSave));
  }, [state]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};