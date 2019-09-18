import React from "react";
import { HashRouter as Route, Switch } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/login/Login";
//import AppliedRoute from "./components/Routes/AppliedRoute";
import SignUp from "./components/login/SignUp";
import Gnome from "./components/gnomes/Gnome";
import NotFound from "./components/Routes/NotFound";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";


export default ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={SignUp} props={childProps} />
    <AuthenticatedRoute path="/home" component={Dashboard} props={childProps} />
    <AuthenticatedRoute
      path="/gnome/:gnomeindex"
      exact
      component={Gnome}
      props={childProps}
    />
    
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} childProps={childProps}/>
  </Switch>
);
