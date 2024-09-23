import React from 'react';

interface CardProps {
  onClick: () => void;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ onClick, title, description }) => (
  <div 
    onClick={onClick}
    className="bg-beacon-primary rounded-lg shadow-lg p-8 cursor-pointer transition duration-300 hover:shadow-xl dark:bg-beacon-white"
  >
    <h3 className="text-white text-2xl font-semibold mb-4 dark:text-beacon-dark">{title}</h3>
    <p className="text-white dark:text-beacon-dark">{description}</p>
  </div>
);

export default Card;