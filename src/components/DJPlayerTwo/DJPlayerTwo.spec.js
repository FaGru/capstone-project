import { render, screen } from '@testing-library/react';
import DJPlayerTwo from './DJPlayerTwo';

describe('DJPlayerTwo', () => {
  it('renders two file inputs', () => {
    render(<DJPlayerTwo />);
    const inputTwo = screen.getByTestId('file upload two');
    expect(inputTwo).toBeInTheDocument();
    expect(inputTwo).toHaveAttribute('type', 'file');
  });
});