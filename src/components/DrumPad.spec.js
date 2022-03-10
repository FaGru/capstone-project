import DrumPad from './DrumPad.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DrumPad', () => {
  it('renders a button', () => {
    render(<DrumPad />);
    const drumPad = screen.getByRole('button', { name: 'drum pad' });
    expect(drumPad).toBeInTheDocument();
  });
  it('calls the function, which plays the sample', () => {
    const padClick = jest.fn();
    render(<DrumPad drumPadClick={padClick} />);
    const drumPad = screen.getByRole('button', { name: 'drum pad' });
    userEvent.click(drumPad);
    expect(padClick).toHaveBeenCalled();
  });
});
