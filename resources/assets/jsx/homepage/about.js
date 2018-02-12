import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';
import SearchBox from './search_box';
import Aside from './aside';
import Footer from './footer';

export default class About extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentPage = this.props.current_page;
    currentPage('about');
  }

  render() {
    return(
      <div className="container-fluid px-0">
        <SearchBox/>

        <div id="home-content" className="home-content aside-right">
          <h4 className="p-3 mb-0 text-center">Giới Thiệu Công Ty</h4>
          <div className="row mx-0 mt-5">
            <div className="col-lg-6">
              <img className="img-fluid" src="images/work.jpg"/>
            </div>

            <div className="col-lg-6 py-5">
              Từ khi thành lập đến nay chúng tôi luôn không ngừng cố gắng hoàn thiện để "Tiên tới tương lai".
              Chúng tôi đã, đang và sẽ không ngừng cung cấp những sản phẩm có chất lượng cao nhằm mang đến sự
              hài lòng nhất cho khách hàng.
              <br/><br/>
              Với đội ngũ công nhân luôn vui khỏe, sẵn sàng đáp ứng mọi nhu cầu của quý khách hàng,
              với phương châm: Hợp Tác Để Cùng Nhau Phát Triển. Đề cao khẩu hiệu: " Chân, Thiện, Nhẫn"
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}