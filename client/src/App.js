import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import { withStyles } from '@material-ui/core/styles';


const STYLE = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  }
});

const PROP_TYPES = {
};



class App extends Component {

  static propTypes = PROP_TYPES

  render() {
    return (
      <div>
        <CssBaseline>
          <Header />
          <Routes />
          <Footer />
        </CssBaseline>
      </div>
    );
  }
}


export default withStyles(STYLE, { withTheme: true })(App);
