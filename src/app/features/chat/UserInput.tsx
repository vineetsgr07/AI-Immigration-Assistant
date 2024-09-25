"use client";

import React, { useState, useCallback, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { isSpeechSupported } from '@/types/speech';
import { buttonAnimationProps } from '@/constant/animations';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { SendButton } from '@/components/SendButton';

interface UserInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = React.memo(({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleTranscript = useCallback((transcript: string) => {
        setInput(prevInput => prevInput + transcript);
    }, []);

    const { isRecording, toggleRecording } = useSpeechRecognition(handleTranscript);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    }, [input, isLoading, onSendMessage]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }, [handleSubmit]);

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg" aria-label="Message input form">
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 bg-transparent text-gray-800 dark:text-white"
                placeholder="Type your message..."
                disabled={isLoading}
                aria-label="Message input"
                aria-disabled={isLoading}
            />
            {isSpeechSupported && (
                <motion.button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    {...buttonAnimationProps}
                    aria-label={isRecording ? "Stop recording" : "Start recording"}
                    aria-pressed={isRecording}
                >
                    {isRecording ? <FaMicrophoneSlash aria-hidden="true" /> : <FaMicrophone aria-hidden="true" />}
                </motion.button>
            )}
            <SendButton isLoading={isLoading} disabled={isLoading || !input.trim()} />
        </form>
    );
});

UserInput.displayName = 'UserInput';

export default UserInput;