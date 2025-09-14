import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders items and marks current', async () => {
    const onNavigate = vi.fn();
    render(
      <Navbar
        items={[
          { id: 'home', label: 'Home' },
          { id: 'about', label: 'About' }
        ]}
        currentId="home"
        onNavigate={onNavigate}
      />
    );
    const home = screen.getByRole('button', { name: 'Home' });
    expect(home).toHaveAttribute('aria-current', 'page');
    const about = screen.getByRole('button', { name: 'About' });
    await userEvent.click(about);
    expect(onNavigate).toHaveBeenCalledWith('about');
  });
});

