'use client';

import React from 'react';

interface TimeSelectButtonProps {
  time: string;
  isActive: boolean;
  onClick: () => void;
  isLeftButton: boolean;
}

const TimeSelectButton: React.FC<TimeSelectButtonProps> = ({
  time,
  isActive,
  onClick,
  isLeftButton,
}) => {
  const baseStyle = `
    px-12 py-6 text-3xl font-bold text-white
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    hover:opacity-90 shadow-lg hover:shadow-xl
    active:shadow-md active:translate-y-0.5
  `;
  const activeStyle = 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]';
  const inactiveStyle = 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)]';
  const roundedStyle = isLeftButton
    ? 'rounded-l-full rounded-r-none'
    : 'rounded-r-full rounded-l-none';

  return (
    <button
      className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle} ${roundedStyle}`}
      onClick={onClick}
    >
      {time}
    </button>
  );
};

export default TimeSelectButton;
