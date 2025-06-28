import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { store } from './app/store';
import './styles/index.css';

const queryClient = new QueryClient();


// if (import.meta.env.MODE === 'development') {
//   const { worker } = await import('./api/msw/browser');
//   worker.start();
// }


if (import.meta.env.MODE === 'development') {
  import('./api/msw/browser')
    .then(({ worker }) => {
      worker.start();
      console.log('%c[MSW] Mock Service Worker started.', 'color: green; font-weight: bold;');
    })
    .catch((err) => console.error('Failed to start MSW', err));
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);