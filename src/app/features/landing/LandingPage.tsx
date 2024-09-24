"use client";

import React, { useState } from 'react';
import Layout from '@/app/features/layout/Layout';
import Hero from '@/app/features/landing/components/Hero';
import Card from '@/app/features/landing/components/Card';
import ChatInterface from '@/app/features/chat/components/ChatInterface';

const HERO_TITLE = "Simplify Your Path to a New Life in Canada";
const HERO_SUBTITLE = "Use our AI-powered assistant to get accurate and up-to-date information about immigration processes.";

const CARDS = [
    {
        title: 'Immigration Assistant',
        description: "Get assistance with immigration processes, visa options, and eligibility criteria.",
        type: 'immigration',
    },
    {
        title: "General Information",
        description: "Ask any general questions about life in Canada, culture, and more.",
        type: 'general',
    }
] as const;

type BotType = typeof CARDS[number]['type'];

const LandingPage: React.FC = () => {
    const [selectedBot, setSelectedBot] = useState<BotType | null>(null);

    return (
        <Layout showBackButton={!!selectedBot} onBack={() => setSelectedBot(null)}>
            {selectedBot ? (
                <div className="w-full h-full">
                    <ChatInterface botType={selectedBot} />
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <Hero
                        title={HERO_TITLE}
                        subtitle={HERO_SUBTITLE}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {CARDS.map((card) => (
                            <Card
                                key={card.type}
                                onClick={() => setSelectedBot(card.type)}
                                title={card.title}
                                description={card.description}
                                type={card.type}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default LandingPage;