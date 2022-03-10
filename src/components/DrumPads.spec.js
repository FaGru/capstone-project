import DrumPads from './DrumPad.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DrumPads', () => {
  it('renders 12 button', () => {
    render(<DrumPads />);

    const drumPad = screen.getAllByRole('button', { name: 'Drum Pad' });

    expect(drumPad.length).toBe(12);
  });
  it('calls the function, which plays the sample', () => {
    const padClick = jest.fn();
    render(<DrumPads drumPadClick={padClick} />);

    const drumPads = screen.getAllByRole('button', { name: 'Drum Pad' });
    drumPads.forEach(drumPad => {
      userEvent.click(drumPad);
      expect(padClick).toHaveBeenCalled();
    });
  });
});
