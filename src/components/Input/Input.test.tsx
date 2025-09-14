import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('associates label with input', () => {
    render(<Input label="Name" placeholder="Your name" />);
    const inp = screen.getByLabelText('Name');
    expect(inp).toBeInTheDocument();
    expect(inp).toHaveAttribute('placeholder', 'Your name');
  });

  it('changes value on input', async () => {
    const user = userEvent.setup();
    render(<Input label="Email" />);
    const inp = screen.getByLabelText('Email');
    await user.type(inp, 'a');
    expect(inp).toHaveValue('a');
  });

  it('shows error and sets aria-invalid', () => {
    render(<Input label="Email" error="Required" />);
    const inp = screen.getByLabelText('Email');
    expect(inp).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });
});

