import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ensure the DOM is cleaned up between tests to avoid portal leftovers, etc.
afterEach(() => {
  cleanup();
});
