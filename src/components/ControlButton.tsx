'use client';

import React, { ReactNode } from 'react';

interface ControlButtonProps {
  onClick: () => void;
  children: ReactNode;
  color: 'primary' | 'secondary';
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, color }) => {
  const baseStyle = `
    p-5 rounded-full text-white
    transition-all duration-200 ease-in-out
    shadow-lg hover:shadow-xl active:shadow-md active:translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  `;
  const colorStyle =
    color === 'primary'
      ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
      : 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)]';

  return (
    <button className={`${baseStyle} ${colorStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ControlButton;
