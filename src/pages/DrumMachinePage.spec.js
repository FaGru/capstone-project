import DrumMachinePage from './DrumMachinePage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tone from 'tone';

jest.mock('tone', () => {
  return {
    Player: jest.fn().mockReturnValue({
      toDestination: jest.fn().mockReturnValue({}),
    }),
    Players: jest.fn().mockReturnValue({
      toDestination: jest.fn().mockReturnValue({}),
    }),
    loaded: jest.fn().mockReturnValue({ then: jest.fn() }),
  };
});

describe('DrumMaschinePage', () => {
  render(
    <MemoryRouter>
      <DrumMachinePage
        allPads={[
          { id: '1', color: 'yellow', sample: './audio/Samples/Scratch1.wav' },
          { id: '2', color: 'red', sample: './audio/Samples/Horn1.mp3' },
          {
            id: '3',
            color: 'purple',
            sample: './audio/Samples/SynthShot1.wav',
          },
          {
            id: '4',
            color: 'yellow',
            sample: './audio/Samples/CongaFinger.wav',
          },
          { id: '5', color: 'purple', sample: './audio/Samples/BassShot3.wav' },
          { id: '6', color: 'purple', sample: './audio/Samples/BassShot2.wav' },
          { id: '7', color: 'green', sample: './audio/Samples/Clap1.wav' },
          { id: '8', color: 'blue', sample: './audio/Samples/Brass1.wav' },
          { id: '9', color: 'blue', sample: './audio/Samples/Brass2.wav' },
          { id: '10', color: 'green', sample: './audio/Samples/Kick1.wav' },
          { id: '11', color: 'green', sample: './audio/Samples/Snare1.wav' },
          { id: '12', color: 'orange', sample: './audio/Samples/Vocal1.wav' },
        ]}
      />
    </MemoryRouter>
  );

  it('renders 12 buttons', () => {
    const drumPads = screen.getAllByRole('button', { name: 'drum pad' });
    expect(drumPads.length).toBe(12);
  });

  it('calls Tone.Player', () => {
    expect(Tone.Player).toHaveBeenCalled();
    expect(Tone.Player().toDestination).toHaveBeenCalled();
  });

  it('calls Tone.Players', () => {
    expect(Tone.Players).toHaveBeenCalled()
    expect(Tone.Players().toDestination).toHaveBeenCalled()
  })
});
