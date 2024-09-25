"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Layout from '@/app/features/layout/Layout';
import Hero from '@/app/features/landing/components/Hero';
import Card from '@/app/features/landing/components/Card';
import ChatInterface from '@/app/features/chat/ChatInterface';
import { CARDS, LANDING_PAGE_TEXT } from '@/constant/landing';

type BotType = typeof CARDS[number]['type'];

const LandingPage: React.FC = () => {
    const [selectedBot, setSelectedBot] = useState<BotType | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (!session) return null;

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const userName = session.user?.name ? capitalizeFirstLetter(session.user.name) : 'User';

    return (
        <Layout showBackButton={!!selectedBot}
            onBack={() => setSelectedBot(null)}
            title={selectedBot ? `Chat with ${selectedBot} bot` : "AI Immigration Assistant"}
        >
            {selectedBot ? (
                <div className="w-full h-full" aria-live="polite">
                    <h2 className="sr-only">{`Chat with ${selectedBot} bot`}</h2>
                    <ChatInterface botType={selectedBot} />
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <Hero
                        title={LANDING_PAGE_TEXT.HERO_TITLE}
                        subtitle={LANDING_PAGE_TEXT.HERO_SUBTITLE}
                    />
                    <h1 className="text-xl mb-4 dark:text-white">Welcome, {userName}!</h1>
                    <section aria-label="Bot selection">
                        <h2 className="sr-only">Choose a bot to chat with</h2>
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
                    </section>
                </div>
            )}
        </Layout>
    );
};

export default LandingPage;