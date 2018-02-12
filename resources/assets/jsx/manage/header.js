import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return(
      <div className="headerbar">
        <div className="headerbar-left">
          <Link to="/" className="logo"><span>Quản Trị</span></Link>
        </div>

        <nav className="navbar-custom">
          <ul className="list-inline float-right mb-0">
              <li className="list-inline-item dropdown notif">
                  <a className="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                      <img src="/images/avatars/admin.png" alt="Profile image" className="avatar-rounded" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                      
                    <div className="dropdown-item noti-title">
                        <h5 className="text-overflow"><small>Hello, admin</small> </h5>
                    </div>

                    <a href="/logout" className="dropdown-item notify-item">
                        <i className="fa fa-power-off"></i> <span>Logout</span>
                    </a>
                  </div>
              </li>

          </ul>
        </nav>
      </div>
    );
  }
}