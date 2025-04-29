import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Optional: for debugging
import App from './App';
import ThemeContextProvider from './theme/themeContext';

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
    <ReactQueryDevtools initialIsOpen={false} /> {/* Optional: Devtools */}
  </QueryClientProvider>
);