import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders title and content', () => {
    render(
      <Card title="My Card">
        <p>Hello</p>
      </Card>
    );
    expect(screen.getByRole('heading', { name: 'My Card' })).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});

