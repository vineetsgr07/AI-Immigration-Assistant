import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => (
  <section className="text-center mb-16 dark:text-beacon-white">
    <h2 className="text-4xl font-bold mb-4">{title}</h2>
    <p className="text-xl mb-8">{subtitle}</p>
  </section>
);

export default Hero;