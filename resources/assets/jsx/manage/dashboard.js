import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('dashboard');
  }

  render() {
    return(
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-holder">
                  <h1 className="main-title float-left">Bảng Điều Khiển</h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item text-secondary">Bảng điều khiển</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="row">
                <div className="col-4">
                  <Link to="/categories">
                    <div className="control-feild d-flex align-items-center bg-warning p-3">
                      <p className="d-flex align-items-center">
                        <i className="fa fa-cube"></i><span>Loại sản phẩm</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="col-4">
                  <Link to="/products">
                    <div className="control-feild d-flex align-items-center bg-success p-3">
                      <p className="d-flex align-items-center">
                        <i className="fa fa-cubes"></i><span>Sản phẩm</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="col-4">
                  <Link to="/contact">
                    <div className="control-feild d-flex align-items-center bg-primary p-3">
                      <p className="d-flex align-items-center">
                        <i className="fa fa-phone"></i><span>Liên hệ</span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-4">
                  <Link to="/company">
                    <div className="control-feild d-flex align-items-center bg-info p-3">
                      <p className="d-flex align-items-center">
                        <i className="fa fa-info"></i><span>Thông tin công ty</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="col-4">
                  <Link to="/trash">
                    <div className="control-feild d-flex align-items-center bg-danger p-3">
                      <p className="d-flex align-items-center">
                        <i className="fa fa-trash"></i><span>Thùng rác</span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}