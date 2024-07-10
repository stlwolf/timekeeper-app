'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import TimeSelectButton from './TimeSelectButton';
import StartButton from './StartButton';
import ControlButton from './ControlButton';
import TimerDisplay from './TimerDisplay';
import useAudioPlayer from '../hooks/useAudioPlayer';

// 音声ファイルのディレクトリを定数化
const ONE_MINUTE_WARNING_DIR = '/sound/one-minute-warning/';
const TIMER_END_DIR = '/sound/timer-end/';

// 音声ファイル名のリスト（両方のディレクトリに同じ名前のファイルが存在することを前提とします）
const audioFileNames = [
  'zyros.wav',
  'serin.wav',
  'molk.wav',
  'desphara.wav',
  'arin.wav',
  'satyrus.wav',
];

// ランダムな音声ファイル名を選択する関数
const getRandomAudioFileName = () => {
  const randomIndex = Math.floor(Math.random() * audioFileNames.length);
  return audioFileNames[randomIndex];
};

const TimekeeperApp: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(180); // 3 minutes in seconds
  const [activeTime, setActiveTime] = useState('3分');
  const [isOvertime, setIsOvertime] = useState(false);
  const [selectedAudioFileName, setSelectedAudioFileName] = useState('');

  const oneMinuteWarning = useAudioPlayer(
    selectedAudioFileName ? ONE_MINUTE_WARNING_DIR + selectedAudioFileName : ''
  );
  const timerEnd = useAudioPlayer(
    selectedAudioFileName ? TIMER_END_DIR + selectedAudioFileName : ''
  );

  const selectRandomAudioFile = useCallback(() => {
    const newFileName = getRandomAudioFileName();
    console.log(`新しい音声ファイルを選択しました: ${newFileName}`);
    setSelectedAudioFileName(newFileName);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > -3600) {
            // 1分前の警告
            if (prevTime === 61) {
              oneMinuteWarning.play();
            }
            // タイマー終了時
            if (prevTime === 1) {
              timerEnd.play();
            }
            return prevTime - 1;
          } else {
            setIsRunning(false);
            return prevTime;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, oneMinuteWarning, timerEnd]);

  useEffect(() => {
    if (time < 0 && !isOvertime) {
      setIsOvertime(true);
    } else if (time >= 0 && isOvertime) {
      setIsOvertime(false);
    }
  }, [time, isOvertime]);

  // 音声ファイルの状態をチェック（オプション）
  useEffect(() => {
    const checkAudioStatus = () => {
      if (!oneMinuteWarning.isReady) {
        console.warn('1分前警告音の読み込みに失敗しました');
      }
      if (!timerEnd.isReady) {
        console.warn('タイマー終了音の読み込みに失敗しました');
      }
    };

    // 音声ファイルの読み込みに十分な時間を与える
    const timeoutId = setTimeout(checkAudioStatus, 2000);

    return () => clearTimeout(timeoutId);
  }, [oneMinuteWarning.isReady, timerEnd.isReady]);

  const startTimer = () => {
    selectRandomAudioFile(); // タイマー開始時にランダムな音声ファイルを選択
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(activeTime === '3分' ? 180 : 360);
    setIsOvertime(false);
    selectRandomAudioFile(); // タイマーリセット時にも新しい音声ファイルを選択
  };

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = absSeconds % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const selectTime = (selectedTime: '3分' | '6分') => {
    setActiveTime(selectedTime);
    setTime(selectedTime === '3分' ? 180 : 360);
    setIsRunning(false);
    setIsOvertime(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-2xl aspect-[4/3] flex flex-col justify-center items-center">
        {!isRunning && time > 0 && time === (activeTime === '3分' ? 180 : 360) ? (
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
          <TimerDisplay time={formatTime(time)} isOvertime={isOvertime} />
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
