import DrumMachinePage from './DrumMachinePage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('DrumMaschinePage', () => {
  render(
    <MemoryRouter>
      <DrumMachinePage />
    </MemoryRouter>
  );

  it('renders 12 buttons', () => {
    const drumPads = screen.getAllByRole('button', { name: 'drum pad' });
    expect(drumPads.length).toBe(12);
  });
});
