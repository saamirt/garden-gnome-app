import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login";
import Dashboard from "./components/layout/Dashboard";
import Gnome from "./components/gnomes/Gnome";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "./App.css";
import backgroundImg from "./assets/bg-white-01.jpg";
//import backgroundImg from './assets/bg-green.jpg';
//import backgroundImg from './assets/bg-light.jpg';
//import backgroundImg from './assets/Artboard-1.png';
//import backgroundImg from './assets/bg.jpg';

class App extends Component {
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                onSelect={selected => {
                  const to = "/" + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-home"
                        style={{ fontSize: "1.75em" }}
                      />{" "}
                    </NavIcon>{" "}
                    <NavText> Home </NavText>{" "}
                  </NavItem>{" "}
                </SideNav.Nav>{" "}
              </SideNav>{" "}
              <div
                className="App"
                style={{
                  backgroundImage: `url(${backgroundImg})`,
                  paddingLeft: "6rem",
                  paddingRight: "2rem"
                }}
              >
                <div
                  className="container"
                  style={{
                    paddingTop: "4rem",
                    paddingBottom: "4rem"
                  }}
                >
                  <Switch>
                    <Route exact path="/login" component={Login} />{" "}
                    <Route exact path="/" component={Dashboard} />{" "}
                    <Route exact path="/gnome/:gnomeindex" component={Gnome} />{" "}
                  </Switch>{" "}
                </div>{" "}
              </div>{" "}
            </React.Fragment>
          )}
        />{" "}
      </Router>
    );
  }
}

export default App;
