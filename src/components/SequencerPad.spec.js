import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import SequencerPad from './SequencerPad';

describe('SequencerPad', () => {
  it('renders a button and calls the sequencerPadClick function on click', () => {
    const sequencerPadClick = jest.fn();
    render(<SequencerPad sequencerPadClick={sequencerPadClick} />);

    const sequencerPad = screen.getByTestId('sequencer-pad');

    userEvent.click(sequencerPad);

    expect(sequencerPad).toBeInTheDocument();
    expect(sequencerPadClick).toHaveBeenCalled();
  });
});
