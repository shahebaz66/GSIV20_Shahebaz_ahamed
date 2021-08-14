import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ListPage from "./components/listpage/listPage";
import Detail from "./components/detailspage/detail";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/details/:id">
          <Detail />
        </Route>
        <Route path="/">
          <ListPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
