"use client";

import React, { useCallback, useRef, useEffect } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import CardComponent from '@/components/CardComponent';
import UserInput from './UserInput';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Message, Card, ChatInterfaceProps } from '@/types/chat';
import { ActionType, CONTEXTS } from '@/constant/chat';

const { ADD_MESSAGE, ADD_CARD, SET_LOADING, SET_ERROR, CLEAR_CHAT, SET_ACTIVE_CONTEXT, LOAD_STATE } = ActionType;


const ChatInterface: React.FC<ChatInterfaceProps> = ({ botType }) => {
  const { state, dispatch } = useChatContext();
  const { immigrationMessages, generalMessages, immigrationCards, generalCards, isLoading, error, activeContext } = state;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [immigrationMessages, generalMessages]);

  useEffect(() => {
    dispatch({ type: SET_ACTIVE_CONTEXT, payload: botType });
  }, [botType, dispatch]);

  const handleSendMessage = useCallback(async (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: ADD_MESSAGE, payload: { message: newMessage, context: activeContext } });
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "user", parts: [{ text: `You are a helpful assistant that provides information about ${activeContext} topics. Please respond accordingly.` }] },
            ...(activeContext === 'immigration' ? immigrationMessages : generalMessages).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            })),
            { role: "user", parts: [{ text }] }
          ],
          botType: activeContext
        }),
      });

      if (!response.ok) {
        throw new Error('API response was not ok');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.content,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: ADD_MESSAGE, payload: { message: botMessage, context: activeContext } });

      if (data.card) {
        const newCard: Card = {
          id: Date.now().toString(),
          title: data.card.title,
          content: data.card.content,
        };
        dispatch({ type: ADD_CARD, payload: { card: newCard, context: activeContext } });
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: SET_ERROR, payload: 'Sorry, there was an error processing your request.' });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  }, [activeContext, immigrationMessages, generalMessages, dispatch]);

  const messages = activeContext === CONTEXTS.IMMIGRATION ? immigrationMessages : generalMessages;
  const cards = activeContext === CONTEXTS.IMMIGRATION ? immigrationCards : generalCards;

  return (
    <div className="flex flex-col h-full w-full" role="main" aria-label="Chat Interface">
      <div className="flex-grow overflow-y-auto p-4 bg-beacon-bg dark:bg-gray-900" role="log" aria-live="polite" aria-relevant="additions">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MessageBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          {cards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
          {error && (
            <div className="text-red-500 text-center" role="alert" aria-live="assertive">{error}</div>
          )}
          <div ref={messagesEndRef} tabIndex={-1} aria-hidden="true" />
        </div>
      </div>
      <div className="w-full bg-white dark:bg-gray-800 border-t">
        <div className="max-w-3xl mx-auto p-4">
          <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;