'use client';

import React from 'react';

interface TimerDisplayProps {
  time: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p className="text-[12rem] font-bold text-gray-800 leading-none font-quicksand">{time}</p>
    </div>
  );
};

export default TimerDisplay;
