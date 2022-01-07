import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import "./custom.css";
import MainComponent from "./components/MainComponent";

export function App(props) {
  return (
    <Router basename={props.basename}>
      <Switch>
        <Route path="/" element={<MainComponent />} />
      </Switch>
    </Router>
  );
}

export default App;
