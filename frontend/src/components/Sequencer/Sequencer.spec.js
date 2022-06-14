import { render, screen } from '@testing-library/react';
import Sequencer from './Sequencer';

jest.mock('tone', () => {
  return {
    Sequence: jest
      .fn()
      .mockReturnValue({
        start: jest.fn().mockReturnValue({ dispose: jest.fn() }),
      }),
  };
});

describe('Sequence', () => {
  it('renders 32 buttons', () => {
    render(<Sequencer />);

    const sequencerButton = screen.getAllByTestId('sequencer-button');

    expect(sequencerButton.length).toBe(32);
  });
});
