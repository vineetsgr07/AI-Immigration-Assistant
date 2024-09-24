// src/components/CardComponent.tsx
"use client";

import React from 'react';
import { Card as CardType } from '../types/chat'; 

interface CardComponentProps {
  card: CardType;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
      <p>{card.content}</p>
    </div>
  );
};

export default CardComponent;