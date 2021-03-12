import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from 'context/AppContext';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';
import Routes from './routes';
import 'assets/scss/custom.scss';

function App() {
  return (
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
  );
}
export default App;
