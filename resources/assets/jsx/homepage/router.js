import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import Header from './header';
import NavBar from './navbar';
import ProductDetail from './product_detail';
import Products from './products';
import PageNotFound from './page_not_found';
import Contact from './contact';
import CompanyInfo from './company_info';
import About from './about';

export default class HomeRouter extends React.Component  {
	constructor() {
		super();

		this.state = {
			current_page: ''
		}

		this.currentPage = this.currentPage.bind(this);
	}

	currentPage(current) {
		this.setState({
			current_page: current
		});
	}

  render() {
    return(
      <div className="bg-light wrapper container-fluid px-0">
      <Header/>
      <NavBar current_page={this.state.current_page}/>
      	<Switch>
          <Route exact path="/" render={() => <Homepage current_page={this.currentPage}/>}/>
          <Route exact path="/chi-tiet-san-pham/:id" render={({match}) => <ProductDetail match={match}
          current_page={this.currentPage}/>}/>
          <Route exact path="/san-pham/:cate_id" render={({match}) => <Products match={match}
          current_page={this.currentPage}/>}/>
          <Route exact path="/lien-he" render={() => <Contact current_page={this.currentPage}/>}/>
          <Route exact path="/ho-so-cong-ty" render={() => <CompanyInfo current_page={this.currentPage}/>}/>
          <Route exact path="/gioi-thieu" render={() => <About current_page={this.currentPage}/>}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}