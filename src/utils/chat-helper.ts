import { ChatState } from '../types/chat';
import { STORAGE_KEY } from '../constant/chat';

// Initial state
export const initialState: ChatState = {
    immigrationMessages: [],
    generalMessages: [],
    immigrationCards: [],
    generalCards: [],
    isLoading: false,
    error: null,
    activeContext: 'immigration',
};


export const loadState = (): ChatState => {
    if (typeof window === 'undefined') return initialState;
    try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        return savedState ? JSON.parse(savedState) : initialState;
    } catch (e) {
        console.error('Failed to load chat state:', e);
        return initialState;
    }
};

export const saveState = (state: ChatState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save chat state:', e);
    }
};