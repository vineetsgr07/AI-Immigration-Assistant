"use client";

import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonAnimationProps } from '@/constant/animations';

interface SendButtonProps {
    isLoading: boolean;
    disabled: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ isLoading, disabled }) => (
    <motion.button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 transition-all duration-300"
        disabled={disabled}
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
);