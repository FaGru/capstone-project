import DrumLoopPlayer from './DrumLoopPlayer.js';
import { render, screen } from '@testing-library/react';
import Tone from 'tone';
import userEvent from '@testing-library/user-event';

jest.mock('tone', () => {
  return {
    Player: jest.fn().mockReturnValue({
      toDestination: jest.fn().mockReturnValue({}),
    }),
    loaded: jest.fn().mockReturnValue({ then: jest.fn() }),
  };
});

describe('DrumLoopPlayer', () => {
  it('renders a play/pause button and a select', () => {
    render(<DrumLoopPlayer />);
    const playPauseButton = screen.getByRole('button', { name: 'play pause' });
    const loopSelect = screen.getByRole('combobox', {
      name: 'Choose a Drum Loop',
    });
    expect(playPauseButton).toBeInTheDocument();
    expect(loopSelect).toBeInTheDocument();
  });

  it('calls Tone.Player and calls the play function', () => {
    render(<DrumLoopPlayer />);
    expect(Tone.Player).toHaveBeenCalled();
    expect(Tone.Player().toDestination).toHaveBeenCalled();
    const playPauseButton = screen.getByRole('button', { name: 'play pause' });
    userEvent.click(playPauseButton);
    expect(Tone.loaded).toHaveBeenCalled();
  });
});
