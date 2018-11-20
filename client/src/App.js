import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Routes from './routes';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
// import '../styles/_base.scss';

const PROP_TYPES = {
};

export default class App extends Component {

  static propTypes = PROP_TYPES

  render() {
    return (
      <main>
          <Header />
          <Routes />
          <Footer />
      </main>
    );
  }
}
