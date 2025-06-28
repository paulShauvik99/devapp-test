import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Start the worker in development
if (import.meta.env.MODE === 'development') {
    worker.start({
        onUnhandledRequest: 'warn',
    });
}