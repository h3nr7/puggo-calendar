import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default class Home extends React.Component {
  render() {
    return(
      <div className='home__page'>
        <h2>Home</h2>
        <a href='/oauth/strava'>Strava</a>
      </div>
    );
  }
}
