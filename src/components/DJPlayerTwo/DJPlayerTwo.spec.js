import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import DJPlayerTwo from './DJPlayerTwo';

describe('DJPlayerTwo', () => {
  it('renders two file inputs', () => {
    render(<DJPlayerTwo />);
    const inputTwo = screen.getByTestId('file upload two');
    expect(inputTwo).toBeInTheDocument();
    expect(inputTwo).toHaveAttribute('type', 'file');
  });
  it('renders a range input', () => {
    render(<DJPlayerTwo />);
    const pitchTwo = screen.getByTestId('pitch fader two');
    expect(pitchTwo).toBeInTheDocument();
    expect(pitchTwo).toHaveAttribute('type', 'range');
  });
  it('calls the dj-player switch function', () => {
    const setVisiblePlayer = jest.fn();
    render(
      <DJPlayerTwo visiblePlayer={2} setVisiblePlayer={setVisiblePlayer} />
    );
    const switchButton = screen.getByText('Show Player 1');
    userEvent.click(switchButton);
    expect(setVisiblePlayer).toHaveBeenCalled();
  });
});
