import '@component/styles/global.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import MainLayout from '../components/MainLayout';  // Adjust path based on your project structure

function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default App;