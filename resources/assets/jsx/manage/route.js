import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import Products from './products';
import Aside from './aside';
import Header from './header';
import EitProduct from './edit-product';
import Categories from './categories';
import Contact from './contact';
import Company from './company';
import Trash from './trash';
import PageNotFound from './page_not_found';

export default class DashboardRouter extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: ''
    }

    this.currentPage = this.currentPage.bind(this);
  }

  currentPage(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    return(
      <div className="container-fluid px-0">
        <Header/>
        <Aside currentPage={this.state.currentPage}/>

      	<Switch>
          <Route exact path="/" render={() => <Dashboard currentPage={this.currentPage} />}/>
          <Route exact path="/products" render={() => <Products currentPage={this.currentPage}/>}/>
          <Route exact path="/edit/:id" render={({match}) => <EitProduct match={match} currentPage={this.currentPage}/>}/>
          <Route exact path="/categories" render={() => <Categories currentPage={this.currentPage}/>}/>
          <Route exact path="/contact" render={() => <Contact currentPage={this.currentPage}/>}/>
          <Route exact path="/company" render={() => <Company currentPage={this.currentPage}/>}/>
          <Route exact path="/trash" render={() => <Trash currentPage={this.currentPage}/>}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}