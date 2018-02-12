import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="container-fluid text-center">
        <Link to="/"><img src="/images/logo.png" className="img-fluid"/></Link>
      </div>
    );
  }
}