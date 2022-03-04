import DrumMachine from './DrumMachine'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('DrumMachine', () => {
  it('renders a section with sixteen buttons', () => {
    render(<DrumMachine />)
    const drumPad = screen.getByRole('button', { name: 'Drum Pad 1' })

    expect(drumPad).toBeInTheDocument()
  })
})
