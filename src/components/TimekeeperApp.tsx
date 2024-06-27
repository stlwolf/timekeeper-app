'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import TimeSelectButton from './TimeSelectButton';
import StartButton from './StartButton';
import ControlButton from './ControlButton';
import TimerDisplay from './TimerDisplay';

const TimekeeperApp: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState('03:00');
  const [activeTime, setActiveTime] = useState('3分');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-2xl aspect-[4/3] flex flex-col justify-center items-center">
        {!isRunning ? (
          <>
            <div className="flex justify-center mb-12">
              <TimeSelectButton
                time="3分"
                isActive={activeTime === '3分'}
                onClick={() => setActiveTime('3分')}
                isLeftButton={true}
              />
              <TimeSelectButton
                time="6分"
                isActive={activeTime === '6分'}
                onClick={() => setActiveTime('6分')}
                isLeftButton={false}
              />
            </div>
            <StartButton onClick={() => setIsRunning(true)} />
          </>
        ) : (
          <TimerDisplay time={time} />
        )}
      </div>
      {isRunning && (
        <div className="absolute bottom-8 right-8 flex space-x-4">
          <ControlButton color="secondary" onClick={() => console.log('Pause')}>
            <Pause size={36} />
          </ControlButton>
          <ControlButton color="primary" onClick={() => console.log('Reset')}>
            <RotateCcw size={36} />
          </ControlButton>
        </div>
      )}
    </div>
  );
};

export default TimekeeperApp;
