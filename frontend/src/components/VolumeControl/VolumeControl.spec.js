import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';
import VolumeControl from './VolumeControl';

describe('VolumeControl', () => {
  it('calls the handlePadVolume function', () => {
    const handlePadVolume = jest.fn();
    render(
      <VolumeControl
        handlePadVolume={handlePadVolume}
        isControlsVisible="true"
      />
    );
    const padInput = screen.getByTestId('pad-volume');
    userEvent.type(padInput, '1');
    expect(handlePadVolume).toHaveBeenCalled();
  });
  it('calls the handleLoopPlayerVolume function', () => {
    const handleLoopPlayerVolume = jest.fn();
    render(
      <VolumeControl
        handleLoopPlayerVolume={handleLoopPlayerVolume}
        isControlsVisible="true"
      />
    );
    const loopPlayerInput = screen.getByTestId('drumloop-volume');
    userEvent.type(loopPlayerInput, '3');
    expect(handleLoopPlayerVolume).toHaveBeenCalled();
  });
});
