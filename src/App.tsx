import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';
import Routes from './routes';
import 'assets/scss/custom.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes />
          </Suspense>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
