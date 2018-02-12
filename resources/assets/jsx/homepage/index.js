import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeRouter from './router';

class Index extends React.Component  {
  render() {
    return(
      <Router basename="/">
        <HomeRouter/>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));