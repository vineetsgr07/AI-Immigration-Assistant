"use client";

import React, { useState } from 'react';
import Layout from '@/app/features/layout/Layout';
import Hero from '@/app/features/landing/components/Hero';
import Card from '@/app/features/landing/components/Card';
import ChatInterface from '@/app/features/chat/components/ChatInterface';

const LandingPage: React.FC = () => {
    const [selectedBot, setSelectedBot] = useState<string | null>(null);

    return (
        <Layout showBackButton={!!selectedBot} onBack={() => setSelectedBot(null)}>
            {selectedBot ? (
                <div className="w-full h-full">
                    <ChatInterface botType={selectedBot as any} />
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8 ">
                    <Hero
                        title="Simplify Your Path to a New Life in Canada"
                        subtitle="Use our AI-powered assistant to get accurate and up-to-date information about immigration processes."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <Card
                            onClick={() => setSelectedBot('immigration')}
                            title="Immigration Assistant"
                            description="Get assistance with immigration processes, visa options, and eligibility criteria."
                        />
                        <Card
                            onClick={() => setSelectedBot('general')}
                            title="General Information"
                            description="Ask any general questions about life in Canada, culture, and more."
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default LandingPage;