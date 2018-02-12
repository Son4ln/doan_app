import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    $('.nav-active').removeClass('nav-active');
    if (this.props.current_page === 'homepage') {
      $('#nav-home').addClass('nav-active');
    } else if (this.props.current_page === 'products') {
      $('#nav-products').addClass('nav-active');
    } else if (this.props.current_page === 'contact') {
      $('#nav-contact').addClass('nav-active');
    } else if (this.props.current_page === 'company') {
      $('#nav-company').addClass('nav-active');
    } else if (this.props.current_page === 'about') {
      $('#nav-about').addClass('nav-active');
    }
    return(
      <nav className="home-navbar p-0 navbar navbar-expand-lg bg-success navbar-dark sticky-top">
        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse"
        data-target="#home-navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="home-navbar">
          <ul className="mx-auto navbar-nav">
            <li id="nav-home" className="nav-item">
              <Link className="nav-link" to=""><i className="fa fa-home"></i></Link>
            </li>
            <li id="nav-about" className="nav-item">
              <Link to="/gioi-thieu" className="nav-link">Giới Thiệu</Link>
            </li>

            <li id="nav-products" className="nav-item">
              <Link className="nav-link" to="/san-pham/all">Sản Phẩm</Link>
            </li>

            <li id="nav-company" className="nav-item">
              <Link className="nav-link" to="/ho-so-cong-ty">Hồ Sơ Công Ty</Link>
            </li>

            <li id="nav-contact" className="nav-item">
              <Link className="nav-link" to="/lien-he">Liên Hệ</Link>
            </li>
          </ul>
        </div>  
      </nav>
    );
  }
}