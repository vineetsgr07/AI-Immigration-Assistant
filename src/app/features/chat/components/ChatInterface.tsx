import React, { useEffect, useRef, useCallback } from 'react';
import { useChatState } from '@/hooks/useChatState';
import MessageBubble from './MessageBubble';
import UserInput from './UserInput';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatInterfaceProps {
    botType: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ botType }) => {
    const { messages, isLoading, addMessage, setLoading } = useChatState();
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = useCallback(async (text: string) => {
        addMessage({ id: Date.now().toString(), text, sender: 'user' });
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: "user", parts: [{ text: `You are a helpful assistant that provides information about ${botType === 'immigration' ? 'immigration processes' : 'general topics'}. Please respond accordingly.` }] },
                        ...messages.map(msg => ({
                            role: msg.sender === 'user' ? 'user' : 'model',
                            parts: [{ text: msg.text }]
                        })),
                        { role: "user", parts: [{ text }] }
                    ],
                    botType
                }),
            });

            if (!response.ok) {
                throw new Error('API response was not ok');
            }

            const data = await response.json();
            addMessage({ id: Date.now().toString(), text: data.content, sender: 'bot' });
        } catch (error) {
            console.error('Error:', error);
            addMessage({ id: Date.now().toString(), text: 'Sorry, there was an error processing your request.', sender: 'bot' });
        } finally {
            setLoading(false);
        }
    }, [addMessage, setLoading, messages, botType]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow overflow-y-auto p-4 bg-beacon-bg dark:bg-gray-900">
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
                    <div ref={messagesEndRef} />
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