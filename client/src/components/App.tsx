import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import InterviewPage from '../pages/Interview';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/interview/:id">
          <InterviewPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
