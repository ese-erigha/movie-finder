import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import Routes from './routes';
import 'assets/scss/custom.scss';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes />
          </Suspense>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
