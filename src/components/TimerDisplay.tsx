'use client';

import React from 'react';

interface TimerDisplayProps {
  time: string;
  isOvertime: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, isOvertime }) => {
  const [m1, m2, s1, s2] = time.match(/(\d)(\d):(\d)(\d)/)?.slice(1) || [];

  const digitClass = `w-[8rem] flex items-center justify-center`;
  const textClass = `text-[12rem] font-bold leading-none font-quicksand ${
    isOvertime ? 'text-red-600' : 'text-gray-800'
  }`;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center">
        <div className={digitClass}>
          <span className={textClass}>{m1}</span>
        </div>
        <div className={`${digitClass} -mr-4`}>
          <span className={textClass}>{m2}</span>
        </div>
        <div className={`${digitClass} w-[4rem]`}>
          <span className={textClass}>:</span>
        </div>
        <div className={`${digitClass} -ml-4`}>
          <span className={textClass}>{s1}</span>
        </div>
        <div className={digitClass}>
          <span className={textClass}>{s2}</span>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
