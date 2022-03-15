import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import KeyboardButtons from './KeyboardButtons.js';

describe('KeyboardButtons', () => {
  it('renders 24 buttons', () => {
    render(<KeyboardButtons />);
    const keyBoardButtons = screen.getAllByRole('button', {
      name: 'keyboard-button',
    });
    expect(keyBoardButtons.length).toBe(24)
  });

  it('calls the Keyboard play-function after click', () => {
    const keyboardClick = jest.fn()
    render(<KeyboardButtons keyboardClick={keyboardClick}/>)
    const keyBoardButtons = screen.getAllByRole('button', {
      name: 'keyboard-button',
    });
    keyBoardButtons.forEach(button => {
      userEvent.click(button)
    })
    expect(keyboardClick).toHaveBeenCalledTimes(24)
  })
});
