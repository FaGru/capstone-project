import DrumPad from './DrumPad.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('DrumMachine', () => {
  it('renders a section with sixteen buttons', () => {
    const padClick = jest.fn()
    render(<DrumPad handleClick={padClick} />);

    const drumPad = screen.getByRole('button', { name: 'Drum Pad' });
    expect(drumPad).toBeInTheDocument();

    userEvent.click(drumPad)
    expect(padClick).toHaveBeenCalled()

  });
});
