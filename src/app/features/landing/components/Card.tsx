import React from 'react';
import { FaPassport, FaGlobeAmericas, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface CardProps {
  onClick: () => void;
  title: string;
  description: string;
  type: 'immigration' | 'general';
}

const cardVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const arrowVariants = {
  hover: { rotate: 90 },
};

const iconMap = {
  immigration: FaPassport,
  general: FaGlobeAmericas,
};

const CardIcon: React.FC<{ type: 'immigration' | 'general' }> = ({ type }) => {
  const Icon = iconMap[type];
  return <Icon className="text-white text-4xl mb-6 dark:text-beacon-dark" />;
};

const CardContent: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <>
    <h3 className="text-white text-2xl font-semibold mb-4 dark:text-beacon-dark">{title}</h3>
    <p className="text-white dark:text-beacon-dark">{description}</p>
  </>
);

const CardArrow: React.FC = () => (
  <motion.div
    className="w-10 h-10 bg-white dark:bg-beacon-dark rounded-full flex items-center justify-center"
    variants={arrowVariants}
    whileHover="hover"
  >
    <FaArrowRight className="h-6 w-6 text-beacon-primary dark:text-white" />
  </motion.div>
);

const Card: React.FC<CardProps> = ({ onClick, title, description, type }) => (
  <motion.div 
    onClick={onClick}
    className="bg-beacon-primary rounded-lg shadow-lg p-8 cursor-pointer transition duration-300 hover:shadow-xl dark:bg-beacon-white overflow-hidden relative group"
    variants={cardVariants}
    whileHover="hover"
    whileTap="tap"
  >
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-beacon-secondary opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
    <div className="relative z-10">
      <CardIcon type={type} />
      <CardContent title={title} description={description} />
    </div>
    <div className="absolute bottom-4 right-4">
      <CardArrow />
    </div>
  </motion.div>
);

export default React.memo(Card);