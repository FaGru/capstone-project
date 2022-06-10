import BurgerMenuNavbar from './BurgerMenuNavbar';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { userEvent } from '@storybook/testing-library';

useStore.getState().currentPage = 'Nano-Beats';

describe('BurgerMenuNavbar', () => {
  it('renders 5 Navlinks and a close image', () => {
    render(
      <MemoryRouter>
        <BurgerMenuNavbar />
      </MemoryRouter>
    );
    const closeImage = screen.getByRole('img', { name: 'close' });
    const navLinks = screen.getAllByRole('link');

    expect(closeImage).toBeInTheDocument();
    expect(navLinks.length).toBe(5);
  });
});
