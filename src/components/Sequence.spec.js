import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import Sequence from './Sequence';

describe('Sequence', () => {
  it('renders a button and calls the update function on click', () => {
    const updateSequenceClick = jest.fn();
    render(<Sequence updateSequenceClick={updateSequenceClick} />);

    const sequencerButton = screen.getByTestId('sequencer-button');

    userEvent.click(sequencerButton);

    expect(sequencerButton).toBeInTheDocument();
    expect(updateSequenceClick).toHaveBeenCalled();
  });
});
