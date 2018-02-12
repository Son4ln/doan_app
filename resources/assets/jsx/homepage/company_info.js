import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';
import SearchBox from './search_box';
import Aside from './aside';
import Footer from './footer';

export default class CompanyInfo extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentPage = this.props.current_page;
    currentPage('company');
  }

  render() {
    return (
      <div className="container-fluid px-0">
        <SearchBox/>

        <div id="home-content" className="home-content">
          <div className="row mx-0">
            <div className="col-12">
              <div className="aside-right">
                <h4 className="p-3 mb-0 text-center">Hồ Sơ Công Ty</h4>
              </div>
            </div>
          </div>

          <div className="row mx-0 mt-3">
            <Aside/>

            <div className="col-lg-9 aside-right">
              <div className="row">
                <div className="col-lg-6 d-flex justify-content-center">
                  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className="d-block w-100" src="/images/ci-3.jpeg" alt="First slide" />
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="/images/ci-2.jpeg" alt="Second slide" />
                      </div>
                      <div className="carousel-item">
                        <img className="d-block w-100" src="/images/ci-1.jpeg" alt="Third slide" />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-lg-6 py-5">
                  <p className="mt-5"><span className="font-weight-bold">Loại hình cty:</span> Thương Mại, Dịch Vụ</p>
                  <p><span className="font-weight-bold">SP/ DV chính:</span> Mút xốp - Khai thác gỗ</p>
                  <p><span className="font-weight-bold">Năm thành lập:</span> 2014</p>
                  <p><span className="font-weight-bold">Mã số thuế:</span> 3702346082</p>
                  <p><span className="font-weight-bold">Số nhân viên:</span> Từ 5 - 10 người</p>
                  <p><span className="font-weight-bold">Thị trường chính:</span>  Toàn Quốc</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}