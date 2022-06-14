import Navbar from './Navbar';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';



describe('Navbar', () => {
  it('renders 7 images, 6 Navlinks and a button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const burgerMenuButton = screen.getByRole('button', {
      name: 'burger menu',
    });
    const navLinks = screen.getAllByRole('link');
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(7);
    expect(navLinks.length).toBe(6);
    expect(burgerMenuButton).toBeInTheDocument();
  });
});
