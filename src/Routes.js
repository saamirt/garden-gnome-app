import React from "react";
import { HashRouter as Route, Switch } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/login/Login";
import AppliedRoute from "./components/AppliedRoute"
import SignUp from "./components/login/SignUp";
import Gnome from "./components/gnomes/Gnome";
import NotFound from "./components/NotFound";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/home" exact component={Dashboard} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={SignUp} props={childProps} />
    <AppliedRoute path="/gnome/:gnomeindex" exact component={Gnome} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
