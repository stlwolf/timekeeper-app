import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeSelectButton from './TimeSelectButton';

describe('TimeSelectButton', () => {
  it('renders with correct styles when active', () => {
    const onClickMock = jest.fn();
    render(
      <TimeSelectButton time="3分" isActive={true} onClick={onClickMock} isLeftButton={true} />
    );
    const button = screen.getByRole('button', { name: /3分/i });
    expect(button).toHaveClass('bg-[var(--color-primary)]');
  });

  it('renders with correct styles when inactive', () => {
    const onClickMock = jest.fn();
    render(
      <TimeSelectButton time="6分" isActive={false} onClick={onClickMock} isLeftButton={false} />
    );
    const button = screen.getByRole('button', { name: /6分/i });
    expect(button).toHaveClass('bg-[var(--color-secondary)]');
  });

  it('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(
      <TimeSelectButton time="3分" isActive={true} onClick={onClickMock} isLeftButton={true} />
    );
    const button = screen.getByRole('button', { name: /3分/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
