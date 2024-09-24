// src/contexts/ChatContext.tsx

"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, Dispatch } from 'react';
import { ChatState, ChatAction } from '@/types/chat';
import { initialState } from '@/utils/chat-helper';
import { ActionType } from '@/constant/chat';

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ActionType.ADD_MESSAGE:
      return {
        ...state,
        [`${action.payload.context}Messages`]: [
          ...state[`${action.payload.context}Messages`],
          action.payload.message,
        ],
      };
    case ActionType.ADD_CARD:
      return {
        ...state,
        [`${action.payload.context}Cards`]: [
          ...state[`${action.payload.context}Cards`],
          action.payload.card,
        ],
      };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionType.CLEAR_CHAT:
      return {
        ...state,
        [`${action.payload}Messages`]: [],
        [`${action.payload}Cards`]: [],
      };
    case ActionType.SET_ACTIVE_CONTEXT:
      return { ...state, activeContext: action.payload };
    case ActionType.LOAD_STATE:
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