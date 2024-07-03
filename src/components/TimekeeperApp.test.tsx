import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import TimekeeperApp from './TimekeeperApp';

// モックの作成
jest.mock('../hooks/useAudioPlayer', () => ({
  __esModule: true,
  default: () => ({
    play: jest.fn(),
    isReady: true,
  }),
}));

describe('TimekeeperApp', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial state correctly', () => {
    render(<TimekeeperApp />);
    expect(screen.getByText('3分')).toBeInTheDocument();
    expect(screen.getByText('6分')).toBeInTheDocument();
  });

  it('starts timer when start button is clicked', () => {
    render(<TimekeeperApp />);
    const startButton = screen.getByRole('button', { name: '' });
    fireEvent.click(startButton);

    const timerContainer = screen.getByTestId('timer-display');
    const digits = within(timerContainer).getAllByText(/[0-9:]/);
    expect(digits).toHaveLength(5);
    expect(digits[0]).toHaveTextContent('0');
    expect(digits[1]).toHaveTextContent('3');
    expect(digits[2]).toHaveTextContent(':');
    expect(digits[3]).toHaveTextContent('0');
    expect(digits[4]).toHaveTextContent('0');
  });

  it('counts down correctly', () => {
    render(<TimekeeperApp />);
    const startButton = screen.getByRole('button', { name: '' });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timerContainer = screen.getByTestId('timer-display');
    const digits = within(timerContainer).getAllByText(/[0-9:]/);
    expect(digits).toHaveLength(5);
    expect(digits[0]).toHaveTextContent('0');
    expect(digits[1]).toHaveTextContent('2');
    expect(digits[2]).toHaveTextContent(':');
    expect(digits[3]).toHaveTextContent('5');
    expect(digits[4]).toHaveTextContent('9');
  });

  // 他のテストケースも追加...
});
