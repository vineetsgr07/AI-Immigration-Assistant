export const STORAGE_KEY = 'chatState';

export const CONTEXTS = {
    IMMIGRATION: 'immigration',
    GENERAL: 'general',
} as const;

export const ActionType = {
    ADD_ITEM: 'ADD_ITEM',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_CHAT: 'CLEAR_CHAT',
    SET_ACTIVE_CONTEXT: 'SET_ACTIVE_CONTEXT',
    LOAD_STATE: 'LOAD_STATE',
    ADD_MESSAGE: 'ADD_MESSAGE',
    ADD_CARD: 'ADD_CARD',
} as const;