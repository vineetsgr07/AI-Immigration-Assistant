// src/constants/text.ts

export const LANDING_PAGE_TEXT = {
    HERO_TITLE: "Simplify Your Path to a New Life in Canada",
    HERO_SUBTITLE: "Use our AI-powered assistant to get accurate and up-to-date information about immigration processes.",
    IMMIGRATION_ASSISTANT: "Immigration Assistant",
    GENERAL_INFORMATION: "General Information",
    IMMIGRATION_DESCRIPTION: "Get assistance with immigration processes, visa options, and eligibility criteria.",
    GENERAL_DESCRIPTION: "Ask any general questions about life in Canada, culture, and more.",
};

export const CARDS = [
    {
        title: LANDING_PAGE_TEXT.IMMIGRATION_ASSISTANT,
        description: LANDING_PAGE_TEXT.IMMIGRATION_DESCRIPTION,
        type: 'immigration',
    },
    {
        title: LANDING_PAGE_TEXT.GENERAL_INFORMATION,
        description: LANDING_PAGE_TEXT.GENERAL_DESCRIPTION,
        type: 'general',
    }
] as const;