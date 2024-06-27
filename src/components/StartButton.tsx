'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-[var(--color-primary)] text-white p-16 rounded-full
                 hover:bg-[var(--color-primary-hover)] transition-all duration-200 ease-in-out
                 shadow-lg hover:shadow-xl active:shadow-md active:translate-y-0.5
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={onClick}
    >
      <Play size={96} />
    </button>
  );
};

export default StartButton;
