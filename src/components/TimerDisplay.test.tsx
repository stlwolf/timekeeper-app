import React from 'react';
import { render, screen } from '@testing-library/react';
import TimerDisplay from './TimerDisplay';

describe('TimerDisplay', () => {
  it('renders the time correctly', () => {
    render(<TimerDisplay time="02:30" isOvertime={false} />);
    const digits = screen.getAllByText(/[0-9:]/);
    expect(digits).toHaveLength(5);
    expect(digits[0]).toHaveTextContent('0');
    expect(digits[1]).toHaveTextContent('2');
    expect(digits[2]).toHaveTextContent(':');
    expect(digits[3]).toHaveTextContent('3');
    expect(digits[4]).toHaveTextContent('0');
  });

  it('applies overtime style when isOvertime is true', () => {
    render(<TimerDisplay time="00:00" isOvertime={true} />);
    const timeElements = screen.getAllByText(/[0:]/);
    timeElements.forEach((element) => {
      expect(element).toHaveClass('text-red-600');
    });
  });
});
