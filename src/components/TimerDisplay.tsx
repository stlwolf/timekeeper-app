'use client';

import React from 'react';

interface TimerDisplayProps {
  time: string;
  isOvertime: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, isOvertime }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p
        className={`text-[12rem] font-bold leading-none font-quicksand ${isOvertime ? 'text-red-600' : 'text-gray-800'}`}
      >
        {time}
      </p>
    </div>
  );
};

export default TimerDisplay;
