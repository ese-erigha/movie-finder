import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import 'assets/scss/custom.scss';

const Home = lazy(() => import('routes/Home'));
function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
