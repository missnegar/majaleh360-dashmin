
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-main">{title}</h3>
        {icon && <div className="text-secondary">{icon}</div>}
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
