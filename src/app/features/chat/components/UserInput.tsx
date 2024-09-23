"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { FaPaperPlane, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface UserInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

type SpeechRecognitionType = {
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    start: () => void;
    stop: () => void;
};

const UserInput: React.FC<UserInputProps> = React.memo(({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<SpeechRecognitionType | null>(null);

    const isSpeechSupported = useMemo(() => {
        return typeof window !== 'undefined' && 
               ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
        
        if (isSpeechSupported) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition() as SpeechRecognitionType;
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');
                setInput(prevInput => prevInput + transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setIsRecording(false);
            };
        }
    }, [isSpeechSupported]);

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

    const toggleRecording = useCallback(() => {
        if (!isSpeechSupported) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsRecording(prev => !prev);
    }, [isRecording, isSpeechSupported]);

    const buttonAnimationProps = useMemo(() => ({
        whileTap: { scale: 0.95 },
        transition: { duration: 0.1 }
    }), []);

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
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
            />
            {isSpeechSupported && (
                <motion.button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 ${
                        isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                    {...buttonAnimationProps}
                    aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                    {isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </motion.button>
            )}
            <motion.button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 transition-all duration-300"
                disabled={isLoading || !input.trim()}
                {...buttonAnimationProps}
                aria-label="Send message"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, rotate: 180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -180 }}
                            className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"
                        />
                    ) : (
                        <motion.div
                            key="send-icon"
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                        >
                            <FaPaperPlane />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </form>
    );
});

UserInput.displayName = 'UserInput';

export default UserInput;