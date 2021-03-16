import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient()

ReactDOM.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </CookiesProvider>

  ,
  document.getElementById('root')
);
