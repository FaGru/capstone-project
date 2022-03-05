import DrumMachine from './DrumMachinePage';
import { render, screen } from '@testing-library/react';



describe('DrumMachine', () => {
  it('renders a section with twelve buttons', () => {
    render(<DrumMachine />);
    const drumPad = screen.getAllByRole('button', { name: 'Drum Pad' });
    
    expect(drumPad.length).toBe(12);
  });
});
