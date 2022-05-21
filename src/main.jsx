import { FavoriteSongsProvider } from '@/features/Song/context/FavoriteSongsContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './app/store';
import './index.css';

import { toast } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      useErrorBoundary: true,
    },
  },
  queryCache: new QueryCache({
    // @ts-ignore
    onError: (error) => toast(`Có lỗi xảy ra ${error.message}`, { type: 'error' }),
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <FavoriteSongsProvider>
        <HelmetProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </HelmetProvider>
      </FavoriteSongsProvider>
    </Provider>
  </React.StrictMode>
);
