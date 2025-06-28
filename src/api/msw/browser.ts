import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Start the worker in development and for offline support
if (typeof window !== 'undefined' && 
    (import.meta.env.MODE === 'development' || 
        import.meta.env.VITE_ENABLE_MSW === 'true')) {
    worker.start({
        onUnhandledRequest: 'warn',
    });
}