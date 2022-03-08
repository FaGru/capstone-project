import DrumPads from './DrumPads.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DrumPads', () => {
  it('renders a button', () => {
    render(<DrumPads />);

    const drumPad = screen.getByRole('button', { name: 'Drum Pad' });

    expect(drumPad).toBeInTheDocument();
  });
  it('calls the function, which plays the sample', () => {
    const padClick = jest.fn();
    render(<DrumPads handleClick={padClick} />);

    const drumPad = screen.getByRole('button', { name: 'Drum Pad' });
    userEvent.click(drumPad);
    expect(padClick).toHaveBeenCalled();
  });
});
