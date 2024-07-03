import { useState, useEffect, useCallback } from 'react';

const useAudioPlayer = (audioSrc: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audioElement = new Audio(audioSrc);

    const handleCanPlayThrough = () => {
      setIsReady(true);
    };

    const handleError = () => {
      console.warn(`音声ファイルの読み込みに失敗しました: ${audioSrc}`);
      setIsReady(false);
    };

    audioElement.addEventListener('canplaythrough', handleCanPlayThrough);
    audioElement.addEventListener('error', handleError);

    setAudio(audioElement);

    return () => {
      audioElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      audioElement.removeEventListener('error', handleError);
      audioElement.pause();
      audioElement.src = '';
    };
  }, [audioSrc]);

  const play = useCallback(() => {
    if (audio && isReady) {
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn('音声の再生に失敗しました:', err);
      });
    }
  }, [audio, isReady]);

  return { play, isReady };
};

export default useAudioPlayer;
