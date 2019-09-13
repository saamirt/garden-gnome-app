import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import {withRouter} from "react-router-dom";
import {Auth} from "aws-amplify";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import ClickOutside from "react-click-outside";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "./App.css";
import backgroundImg from "./assets/bg-white-01.jpg";
import Routes from "./Routes";
//import backgroundImg from './assets/bg-green.jpg';
//import backgroundImg from './assets/bg-light.jpg';
//import backgroundImg from './assets/Artboard-1.png';
//import backgroundImg from './assets/bg.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }
  
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&
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
                      console.log(childProps);
                    }
                  }}
                  expanded={this.state.expanded}
                  onToggle={expanded => {
                    this.setState({ expanded });
                  }}
                >
                  <SideNav.Toggle />
                  {this.state.isAuthenticated ? (
                    <SideNav.Nav defaultSelected="home">
                      <NavItem eventKey="home">
                        <NavIcon>
                          <i
                            className="fa fa-fw fa-home"
                            style={{ fontSize: "1.75em" }}
                          />{" "}
                        </NavIcon>{" "}
                        <NavText> Home </NavText>{" "}
                      </NavItem>{" "}
                      <NavItem onClick={this.handleLogout}>
                        <NavIcon>
                          <i
                            className="fa fa-sign-in"
                            style={{ fontSize: "1.75em" }}
                          />{" "}
                        </NavIcon>{" "}
                        <NavText> Logout </NavText>{" "}
                      </NavItem>
                    </SideNav.Nav>
                  ) : (
                    <SideNav.Nav defaultSelected="login">
                      <NavItem eventKey="login">
                        <NavIcon>
                          <i
                            className="fa fa-sign-in"
                            style={{ fontSize: "1.75em" }}
                          />{" "}
                        </NavIcon>{" "}
                        <NavText> Login </NavText>{" "}
                      </NavItem>
                      <NavItem eventKey="signup">
                        <NavIcon>
                          <i
                            className="fa fa-sign-in"
                            style={{ fontSize: "1.75em" }}
                          />{" "}
                        </NavIcon>{" "}
                        <NavText> Sign Up </NavText>{" "}
                      </NavItem>
                    </SideNav.Nav>
                  )}
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
                  <Routes childProps={childProps}/>
                </div>{" "}
              </div>{" "}
            </React.Fragment>
          )}
        />{" "}
      </Router>
    );
  }
}

export default withRouter(App);
