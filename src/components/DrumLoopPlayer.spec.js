import DrumLoopPlayer from './DrumLoopPlayer.js';
import { render, screen } from '@testing-library/react';

// jest.mock('./DrumLoopPlayer');
// jest.mock('tone', () => {
//   return {
//     PolySynth: jest.fn(),
//     Player: jest.fn().mockImplementation(() => {
//       return { toDestination: jest.fn() }
//     })
//   }
// })

describe('DrumLoopPlayer', () => {
  it('renders a button', () => {
    


    render(<DrumLoopPlayer />);

  });
})