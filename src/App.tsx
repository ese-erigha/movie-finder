import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import WithErrorHandler from 'hoc/withErrorHandler';
import AppContextProvider from 'context/AppContextManager';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';
import Routes from './routes';
import 'assets/scss/custom.scss';

function App() {
  return (
    <HelmetProvider>
      <AppContextProvider>
        <WithErrorHandler>
          <div className="App">
            <Router>
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes />
                </Suspense>
              </Layout>
            </Router>
          </div>
        </WithErrorHandler>
      </AppContextProvider>
    </HelmetProvider>
  );
}
export default App;
