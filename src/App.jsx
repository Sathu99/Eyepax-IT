import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import TeamShow from './Views/TeamShow';
import TeamEdit from './Views/TeamEdit';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/team" />
        <Route path="/team" exact render={() => <TeamShow />} />
        <Route path="/team/edit/:id" render={() => <TeamEdit />} />
        <Route path="*" />
      </Switch>
    </Router>
  );
}

export default App;
