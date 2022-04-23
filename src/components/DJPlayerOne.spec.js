import { render, screen } from '@testing-library/react';
import DJPlayerOne from './DJPlayerOne';

describe('DJPlayerOne', () => {
  it('renders two file inputs', () => {
    render(<DJPlayerOne />);
    const inputOne = screen.getByTestId('file upload one');

    expect(inputOne).toBeInTheDocument();
    expect(inputOne).toHaveAttribute('type', 'file');
  });
});
