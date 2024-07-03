import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlButton from './ControlButton';

describe('ControlButton', () => {
  it('renders with correct styles for primary color', () => {
    const onClickMock = jest.fn();
    render(
      <ControlButton onClick={onClickMock} color="primary">
        Test
      </ControlButton>
    );
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveClass('bg-[var(--color-primary)]');
  });

  it('renders with correct styles for secondary color', () => {
    const onClickMock = jest.fn();
    render(
      <ControlButton onClick={onClickMock} color="secondary">
        Test
      </ControlButton>
    );
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveClass('bg-[var(--color-secondary)]');
  });

  it('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(
      <ControlButton onClick={onClickMock} color="primary">
        Test
      </ControlButton>
    );
    const button = screen.getByRole('button', { name: /test/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
