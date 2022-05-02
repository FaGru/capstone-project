import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import DJPlayerOne from './DJPlayerOne';

describe('DJPlayerOne', () => {
  it('renders a file input', () => {
    render(<DJPlayerOne />);
    const inputOne = screen.getByTestId('file upload one');
    expect(inputOne).toBeInTheDocument();
    expect(inputOne).toHaveAttribute('type', 'file');
  });
  it('renders a range input', () => {
    render(<DJPlayerOne />);
    const pitchOne = screen.getByTestId('pitch fader one');
    expect(pitchOne).toBeInTheDocument();
    expect(pitchOne).toHaveAttribute('type', 'range');
  });
  it('calls the dj-player switch function', () => {
    const setVisiblePlayer = jest.fn();
    render(
      <DJPlayerOne visiblePlayer={1} setVisiblePlayer={setVisiblePlayer} />
    );
    const switchButton = screen.getByText('Show Player 2');
    userEvent.click(switchButton);
    expect(setVisiblePlayer).toHaveBeenCalled();
  });
});
