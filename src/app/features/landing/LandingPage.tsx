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

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null; // This will prevent any flash of content before redirect
    }

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const userName = session.user?.name ? capitalizeFirstLetter(session.user.name) : 'User';

    return (
        <Layout showBackButton={!!selectedBot} onBack={() => setSelectedBot(null)}>
            {selectedBot ? (
                <div className="w-full h-full">
                    <ChatInterface botType={selectedBot} />
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
                    <Hero
                        title={LANDING_PAGE_TEXT.HERO_TITLE}
                        subtitle={LANDING_PAGE_TEXT.HERO_SUBTITLE}
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