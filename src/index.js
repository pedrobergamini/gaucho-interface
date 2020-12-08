import React from 'react';
import ReactDOM from 'react-dom';
import { UseWalletProvider } from 'use-wallet';
import App from './App';

ReactDOM.render(
  <UseWalletProvider chainId={1337}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UseWalletProvider>,
  document.getElementById('root')
);

