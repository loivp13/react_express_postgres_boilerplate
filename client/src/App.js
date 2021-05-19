import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./features/landingPage/LandingPage";
import ActivateAccount from "./features/activateAccount/ActivateAccount.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/activate/:token" component={ActivateAccount}></Route>
      </Switch>
    </Router>
  );
}

export default App;
