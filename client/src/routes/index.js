import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Home from '../components/pages/Home';
import About from '../components/pages/About';

export default class MainRouter extends Component {
  render() {
    return(
      <Switch>
        <Route key='landing' path={'/'} component={Home}/>
        <Route key='about' pat={'/about'} component={About} />
      </Switch>
    );
  }
}
