// import TeamShow from "./Views/TeamShow";
import TeamEdit from "./Views/TeamEdit";
import TeamShow from "./Views/TeamShow";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/team"/>
        <Route
          path="/team"
          exact
          render={(routeprops) => <TeamShow {...routeprops} />}
        />
        <Route
          path="/team/edit/:id"
          render={(routeprops) => <TeamEdit {...routeprops} />}
        />
        <Route path="*" component={""} />
      </Switch>
    </Router>
  );
}

export default App;
