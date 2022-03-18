import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecordButton from './RecordButton';

describe('RecordButton', () => {
  it('renders a record-button', () => {
    render(<RecordButton />);
    expect(screen.getByTestId('record-button')).toBeInTheDocument();
  });
  it('calls the functions to start and stop the record', () => {
    const recordStopClick = jest.fn();
    const recordStartClick = jest.fn();
    render(
      <RecordButton
        recordStopClick={recordStopClick}
        recordStartClick={recordStartClick}
      />
    );
    const recordButton = screen.getByTestId('record-button');
    userEvent.click(recordButton);
    expect(recordStartClick).toHaveBeenCalled();
    expect(recordStopClick).not.toHaveBeenCalled();
    userEvent.click(recordButton);
    expect(recordStopClick).toHaveBeenCalled();
  });
});
