import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login";
import Dashboard from "./components/layout/Dashboard";
import Gnome from "./components/gnomes/Gnome";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import ClickOutside from "react-click-outside";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "./App.css";
import backgroundImg from "./assets/bg-white-01.jpg";
//import backgroundImg from './assets/bg-green.jpg';
//import backgroundImg from './assets/bg-light.jpg';
//import backgroundImg from './assets/Artboard-1.png';
//import backgroundImg from './assets/bg.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  showSettings(event) {
    event.preventDefault();
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <ClickOutside
                onClickOutside={() => {
                  this.setState({ expanded: false });
                }}
              >
                <SideNav
                  onSelect={selected => {
                    const to = "/" + selected;
                    if (location.pathname !== to) {
                      history.push(to);
                    }
                  }}
                  expanded={this.state.expanded}
                  onToggle={expanded => {
                    this.setState({ expanded });
                  }}
                >
                  <SideNav.Toggle />
                  <SideNav.Nav defaultSelected="login">
                    <NavItem eventKey="login">
                      <NavIcon>
                        <i
                          className="fa fa-sign-in"
                          style={{ fontSize: "1.75em" }}
                        />{" "}
                      </NavIcon>{" "}
                      <NavText> Login </NavText>{" "}
                    </NavItem>{" "}
                    <NavItem eventKey="home">
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
              </ClickOutside>
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
                    <Route
                      exact
                      childProps={childProps}
                      path="/login"
                      component={Login}
                    />{" "}
                    <Route
                      exact
                      childProps={childProps}
                      path="/home"
                      component={Dashboard}
                    />{" "}
                    <Route
                      exact
                      childProps={childProps}
                      path="/gnome/:gnomeindex"
                      component={Gnome}
                    />{" "}
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
