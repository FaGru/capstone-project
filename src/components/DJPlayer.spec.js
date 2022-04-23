import { render, screen } from '@testing-library/react';
import DJPlayer from './DJPlayer';

describe('DJPlayer', () => {
  it('renders two file inputs', () => {
    render(<DJPlayer />);
    const inputOne = screen.getByTestId('file upload one');
    
    expect(inputOne).toBeInTheDocument();
    expect(inputOne).toHaveAttribute('type', 'file');
  });
});
