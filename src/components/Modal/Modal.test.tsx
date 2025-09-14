import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when closed', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test">
        Content
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders dialog when open', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Test">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog', { name: 'Test' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('closes when overlay clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Closeable">
        Content
      </Modal>
    );
    await user.click(screen.getByTestId('modal-overlay'));
    expect(onClose).toHaveBeenCalled();
  });
});

