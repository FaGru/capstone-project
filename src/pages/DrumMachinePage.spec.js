import DrumMachine from './DrumMachinePage';
import { render } from '@testing-library/react';



describe('DrumMachine', () => {
  it('renders a section with sixteen buttons', () => {
    render(<DrumMachine />);

  });
});
