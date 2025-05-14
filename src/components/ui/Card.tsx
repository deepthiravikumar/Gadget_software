import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  const classes = [
    'bg-white rounded-lg shadow-sm border border-gray-100',
    paddingClasses[padding],
    className,
  ].join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;