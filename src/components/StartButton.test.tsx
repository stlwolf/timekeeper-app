import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StartButton from './StartButton';

describe('StartButton', () => {
  it('renders with correct styles', () => {
    const onClickMock = jest.fn();
    render(<StartButton onClick={onClickMock} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--color-primary)]');
  });

  it('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(<StartButton onClick={onClickMock} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
