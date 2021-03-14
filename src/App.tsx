import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppContextProvider } from 'context/AppContextManager';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';
import Routes from './routes';
import 'assets/scss/custom.scss';

function App() {
  return (
    <HelmetProvider>
      <AppContextProvider>
        <div className="App">
          <Router>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes />
              </Suspense>
            </Layout>
          </Router>
        </div>
      </AppContextProvider>
    </HelmetProvider>
  );
}
export default App;
