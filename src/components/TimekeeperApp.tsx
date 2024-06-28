'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import TimeSelectButton from './TimeSelectButton';
import StartButton from './StartButton';
import ControlButton from './ControlButton';
import TimerDisplay from './TimerDisplay';

const TimekeeperApp: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(180); // 3 minutes in seconds
  const [activeTime, setActiveTime] = useState('3分');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(activeTime === '3分' ? 180 : 360);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const selectTime = (selectedTime: '3分' | '6分') => {
    setActiveTime(selectedTime);
    setTime(selectedTime === '3分' ? 180 : 360);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-2xl aspect-[4/3] flex flex-col justify-center items-center">
        {!isRunning && time === (activeTime === '3分' ? 180 : 360) ? (
          <>
            <div className="flex justify-center mb-12">
              <TimeSelectButton
                time="3分"
                isActive={activeTime === '3分'}
                onClick={() => selectTime('3分')}
                isLeftButton={true}
              />
              <TimeSelectButton
                time="6分"
                isActive={activeTime === '6分'}
                onClick={() => selectTime('6分')}
                isLeftButton={false}
              />
            </div>
            <StartButton onClick={startTimer} />
          </>
        ) : (
          <TimerDisplay time={formatTime(time)} />
        )}
      </div>
      {(isRunning || time !== (activeTime === '3分' ? 180 : 360)) && (
        <div className="absolute bottom-8 right-8 flex space-x-4">
          <ControlButton color="secondary" onClick={isRunning ? pauseTimer : startTimer}>
            {isRunning ? <Pause size={36} /> : <Play size={36} />}
          </ControlButton>
          <ControlButton color="primary" onClick={resetTimer}>
            <RotateCcw size={36} />
          </ControlButton>
        </div>
      )}
    </div>
  );
};

export default TimekeeperApp;
