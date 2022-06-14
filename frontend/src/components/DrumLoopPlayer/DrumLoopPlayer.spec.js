import DrumLoopPlayer from './DrumLoopPlayer.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DrumLoopPlayer', () => {
  it('renders a play/pause button and a select', () => {
    render(<DrumLoopPlayer devicesState={''}/>);

    const playPauseButton = screen.getByRole('button', { name: 'pause play' });
    const loopSelect = screen.getByRole('combobox', {
      name: 'Choose a Drum Loop',
    });
    expect(playPauseButton).toBeInTheDocument();
    expect(loopSelect).toBeInTheDocument();
  });

  it('calls the play function', () => {
    const startDrumLoop = jest.fn();
    render(<DrumLoopPlayer startDrumLoop={startDrumLoop} devicesState={''}/>);
    const playPauseButton = screen.getByRole('button', { name: 'pause play' });
    userEvent.click(playPauseButton);
    expect(startDrumLoop).toHaveBeenCalled();
  });
});
