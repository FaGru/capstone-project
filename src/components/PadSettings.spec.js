import PadSettings from './PadSettings';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('PadSettings', () => {
  it('renders a select with 12 options, a select with 6 options and a button', () => {
    render(
      <MemoryRouter>
        <PadSettings 
          padSettings={[
            {
              id: '1',
              color: 'yellow',
              sample: './audio/Samples/Scratch1.wav',
            },
            { id: '2', color: 'red', sample: './audio/Samples/Horn1.mp3' },
            {
              id: '3',
              color: 'purple',
              sample: './audio/Samples/SynthShot1.wav',
            },
            {
              id: '4',
              color: 'yellow',
              sample: './audio/Samples/CongaFinger.wav',
            },
            {
              id: '5',
              color: 'purple',
              sample: './audio/Samples/BassShot3.wav',
            },
            {
              id: '6',
              color: 'purple',
              sample: './audio/Samples/BassShot2.wav',
            },
            { id: '7', color: 'green', sample: './audio/Samples/Clap1.wav' },
            { id: '8', color: 'blue', sample: './audio/Samples/Brass1.wav' },
            { id: '9', color: 'blue', sample: './audio/Samples/Brass2.wav' },
            { id: '10', color: 'green', sample: './audio/Samples/Kick1.wav' },
            { id: '11', color: 'green', sample: './audio/Samples/Snare1.wav' },
            { id: '12', color: 'orange', sample: './audio/Samples/Vocal1.wav' },
          ]}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('combobox', { name: 'select a pad' })).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'select a color' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'save this pad' })
    ).toBeInTheDocument();
    
    const padOptions = screen.getAllByRole('option', {name: /DrumPad/ })
    expect(padOptions.length).toBe(12)
    const colorOptions = screen.getAllByTestId(/color/)
    expect(colorOptions.length).toBe(6)
  });


  
  it('calls the save function if button get clicked', () => {
    const savePadClick = jest.fn()

    render(
      <MemoryRouter>
        <PadSettings savePadClick={savePadClick}
          padSettings={[
            {
              id: '1',
              color: 'yellow',
              sample: './audio/Samples/Scratch1.wav',
            },
            { id: '2', color: 'red', sample: './audio/Samples/Horn1.mp3' },
            {
              id: '3',
              color: 'purple',
              sample: './audio/Samples/SynthShot1.wav',
            },
            {
              id: '4',
              color: 'yellow',
              sample: './audio/Samples/CongaFinger.wav',
            },
            {
              id: '5',
              color: 'purple',
              sample: './audio/Samples/BassShot3.wav',
            },
            {
              id: '6',
              color: 'purple',
              sample: './audio/Samples/BassShot2.wav',
            },
            { id: '7', color: 'green', sample: './audio/Samples/Clap1.wav' },
            { id: '8', color: 'blue', sample: './audio/Samples/Brass1.wav' },
            { id: '9', color: 'blue', sample: './audio/Samples/Brass2.wav' },
            { id: '10', color: 'green', sample: './audio/Samples/Kick1.wav' },
            { id: '11', color: 'green', sample: './audio/Samples/Snare1.wav' },
            { id: '12', color: 'orange', sample: './audio/Samples/Vocal1.wav' },
          ]}
        />
      </MemoryRouter>
    );
    userEvent.click(screen.getByRole('button', { name: 'save this pad' }))
    expect(savePadClick).toHaveBeenCalled()
    })  
  })


