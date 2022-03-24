import { render, screen } from '@testing-library/react';
import SequencerSettings from './SequencerSettings';

describe('SequencerSettings', () => {
  it('calls a slider input and a close button', () => {
    render(<SequencerSettings isSettingsVisible="true" />);

    const bpmSlider = screen.getByTestId("Sequencer-BPM");
    const closeButton = screen.getByRole('button', {name: 'close'} )
    expect(bpmSlider).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()
  });
});
