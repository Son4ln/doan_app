import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardRouter from './route';

class Index extends React.Component {
  render() {
    return(
      <Router basename="/dashboard">
        <DashboardRouter />
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));