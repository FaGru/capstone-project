import DrumPad from './DrumPad.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DrumPad', () => {
  it('renders a button', () => {
    render(<DrumPad />);

    const drumPad = screen.getByRole('button', { name: 'Drum Pad' });

    expect(drumPad).toBeInTheDocument();
  });
  it('calls the function, which plays the sample', () => {
    const padClick = jest.fn();
    render(<DrumPad handleClick={padClick} />);

    const drumPad = screen.getByRole('button', { name: 'Drum Pad' });
    userEvent.click(drumPad);
    expect(padClick).toHaveBeenCalled();
  });
});
