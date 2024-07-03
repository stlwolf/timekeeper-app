import { renderHook, act } from '@testing-library/react';
import useAudioPlayer from './useAudioPlayer';

// Audio要素のモック
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
const mockPause = jest.fn();
const mockPlay = jest.fn().mockResolvedValue(undefined);

class AudioMock {
  src: string;
  currentTime: number = 0;
  addEventListener = mockAddEventListener;
  removeEventListener = mockRemoveEventListener;
  pause = mockPause;
  play = mockPlay;

  constructor(src: string) {
    this.src = src;
  }
}

// グローバルなAudioコンストラクタをモック
global.Audio = AudioMock as unknown as typeof global.Audio;

describe('useAudioPlayer', () => {
  const audioSrc = 'test-audio.mp3';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with isReady as false', () => {
    const { result } = renderHook(() => useAudioPlayer(audioSrc));
    expect(result.current.isReady).toBe(false);
  });

  it('should set isReady to true when canplaythrough event is triggered', () => {
    const { result } = renderHook(() => useAudioPlayer(audioSrc));
    act(() => {
      const canPlayThroughHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'canplaythrough'
      )[1];
      canPlayThroughHandler();
    });
    expect(result.current.isReady).toBe(true);
  });

  it('should set isReady to false when error event is triggered', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { result } = renderHook(() => useAudioPlayer(audioSrc));
    act(() => {
      const errorHandler = mockAddEventListener.mock.calls.find((call) => call[0] === 'error')[1];
      errorHandler();
    });
    expect(result.current.isReady).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(`音声ファイルの読み込みに失敗しました: ${audioSrc}`);
    consoleSpy.mockRestore();
  });

  it('should play audio when play is called and audio is ready', async () => {
    const { result } = renderHook(() => useAudioPlayer(audioSrc));
    act(() => {
      const canPlayThroughHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'canplaythrough'
      )[1];
      canPlayThroughHandler();
    });
    await act(async () => {
      result.current.play();
    });
    expect(mockPlay).toHaveBeenCalled();
  });

  it('should not play audio when play is called and audio is not ready', async () => {
    const { result } = renderHook(() => useAudioPlayer(audioSrc));
    await act(async () => {
      result.current.play();
    });
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('should clean up event listeners and pause audio on unmount', () => {
    const { unmount } = renderHook(() => useAudioPlayer(audioSrc));
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledTimes(2);
    expect(mockPause).toHaveBeenCalled();
  });
});
