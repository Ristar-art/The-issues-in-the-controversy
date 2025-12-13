import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.fetch = vi.fn();

// Mock window.confirm
global.confirm = vi.fn(() => true);

// Mock fetch responses
global.fetch = vi.fn(() =>
  Promise.resolve(new Response(JSON.stringify({ success: true }), {
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' }
  }))
);