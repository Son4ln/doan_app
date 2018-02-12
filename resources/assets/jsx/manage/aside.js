import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Aside extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: ''
    }
  }

  componentDidMount() {}

  render() {
    $('.active').removeClass('active');
    if (this.props.currentPage === 'dashboard') {
      $('#nav-dashboard').addClass('active');
    } else if (this.props.currentPage === 'products') {
      $('#nav-products').addClass('active');
    } else if (this.props.currentPage === 'categories') {
      $('#nav-categories').addClass('active');
    } else if (this.props.currentPage === 'contact') {
      $('#nav-contact').addClass('active');
    } else if (this.props.currentPage === 'company') {
      $('#nav-company').addClass('active');
    } else if (this.props.currentPage === 'trash') {
      $('#nav-trash').addClass('active');
    }

    return(
      <div className="left main-sidebar position-fixed">
        <div className="sidebar-inner leftscroll">
          <div id="sidebar-menu">
            <ul>
              <li className="submenu">
                <Link id="nav-dashboard" to="/"><i className="fa fa-fw fa-bars"></i><span> Bảng Điều Khiển </span></Link>
              </li>

              <li className="submenu">
                <Link id="nav-categories" to="/categories"><i className="fa fa-cube"></i><span> Loại Sản Phẩm </span> </Link>
              </li>

              <li className="submenu">
                <Link id="nav-products" to="/products"><i className="fa fa-cubes"></i><span> Sản Phẩm </span> </Link>
              </li>
                
              <li className="submenu">
                <Link id="nav-contact" to="/contact"><i className="fa fa-phone"></i> <span> Liên hệ </span></Link>
              </li>
                          
              <li className="submenu">
                <Link id="nav-company" to="/company"><i className="fa fa-info"></i> <span> Thông Tin Công Ty </span></Link>
              </li>

              <li className="submenu">
                <Link id="nav-trash" to="/trash"><i className="fa fa-trash"></i> <span> Thùng Rác </span></Link>        
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}