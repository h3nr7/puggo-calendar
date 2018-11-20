import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return(
      <div>
        <h2>Home</h2>
        <a href='/oauth/strava'>Strava</a>
      </div>
    );
  }
}
