import { render, screen } from '@testing-library/react';
import DJControls from './DJControls';


describe('DJControls', () => {
  it('renders 8 knob images', () => {
    render(<DJControls />);
    const knobImg = screen.getAllByAltText('control-knob');
    expect(knobImg.length).toBe(8);
  });
  it('renders 3 inputs with type: range', () => {
    render(<DJControls />);
    const rangeInputs = screen.getAllByRole('slider');
    expect(rangeInputs.length).toBe(3);
    rangeInputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'range');
    });
  });


});
