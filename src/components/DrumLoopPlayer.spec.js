import DrumLoopPlayer from './DrumLoopPlayer.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DrumLoopPlayer', () => {
  it('renders a button', () => {
    render(<DrumLoopPlayer />);
    const playButton = screen.getByRole('button', { name: 'play button' });    
    expect(playButton).toBeInTheDocument();
  });
})