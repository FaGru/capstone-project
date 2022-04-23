import { render, screen } from '@testing-library/react';
import SequencerSettings from './SequencerSettings';

describe('SequencerSettings', () => {
  it('renders 2 slider input and a close button', () => {
    render(<SequencerSettings isSettingsVisible="true" />);

    const bpmSlider = screen.getByTestId('Sequencer-BPM');
    const sequencerVolume = screen.getByTestId('Sequencer-Volume');
    const closeButton = screen.getByRole('button', { name: 'close' });
    expect(bpmSlider).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(sequencerVolume).toBeInTheDocument();
  });
});
