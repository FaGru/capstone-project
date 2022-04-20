import { render, screen } from '@testing-library/react';
import DJPlayer from './DJPlayer';

describe('DJPlayer', () => {
  it('renders two file inputs', () => {
    render(<DJPlayer />);
    const inputOne = screen.getByTestId('file upload one');
    const inputTwo = screen.getByTestId('file upload two');
    
    expect(inputOne).toBeInTheDocument();
    expect(inputTwo).toBeInTheDocument();
    expect(inputOne).toHaveAttribute('type', 'file');
    expect(inputTwo).toHaveAttribute('type', 'file');
  });
});
