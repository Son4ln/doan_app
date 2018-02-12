import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';
import SearchBox from './search_box';
import Aside from './aside';
import Footer from './footer';

export default class ProductDetail extends React.Component  {
  constructor() {
    super();

    this.state = {
      product: {},
      imgUrl: '',
      related: [],
      reload: false
    }

    this.initData = this.initData.bind(this);
  }

  componentWillMount() {
    axios.get(`/api/client-get-product/${this.props.match.params.id}`)
    .then(res => this.initData(res.data));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.reload === true) {
      $('#pr-loading').removeClass('d-none');
      this.scrollToAnchor();
      // location.hash = "#home-content";
      axios.get(`/api/client-get-product/${nextProps.match.params.id}`)
      .then(res => this.initData(res.data));
    }

    this.setState({
      reload: true
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentPage = this.props.current_page;
    currentPage('products');
  }

  initData(data) {
    this.setState({
      product: data.product,
      imgUrl: `/storage/products/${data.product.images}`,
      related: data.related
    });

    $('#pr-loading').addClass('d-none');
  }

  scrollToAnchor() {
    $('html, body').animate({
      'scrollTop':   $('#home-content').offset().top - 60
    }, 500);
  }

  getRelated() {
    let products = this.state.related;
    if (products.length > 0) {
      let productArr = [];
      let content = null;
      for (let [index, item] of products.entries()) {
        let key = uuid();
        let imgUrl = `/storage/products/${item.images}`;
        let detailUrl = `/chi-tiet-san-pham/${item.id}`;
        content = (
          <div key={key} className="col-lg-3 mb-4">
            <div className="product-box text-center">
              <img src={imgUrl} className="img-fluid"/>

              <p className="text-success mt-3 font-weight-bold">{item.name}</p>
              <Link to={detailUrl} className="btn btn-primary rounded-0">Xem chi tiết</Link>
            </div>
          </div>
        );

        productArr.push(content);
      }

      return productArr;
    }
  }

  render() {
    return(
      <div className="container-fluid px-0">
        <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        <SearchBox/>

        <div id="home-content" className="home-content">
          <div className="row mx-0">
          <Aside />

            <div className="col-lg-9 aside-right">
              <h4 className="p-3 mb-0">Chi tiết sản phẩm</h4>
              <div className="row mt-3">
                <div className="col-lg-4">
                  <img src={this.state.imgUrl} className="img-fluid"/>
                </div>

                <div className="col-lg-8">
                  <h5>
                    <b>Tên sản phẩm:</b> <span className="text-success">{this.state.product.name}</span>
                  </h5>

                    {this.state.product.parameter &&
                      <h5>Thông số: {this.state.product.parameter}</h5>
                    }

                    <Link className="btn btn-success mb-3" to="/lien-he">Liên hệ để đặt hàng</Link>
                </div>

              </div>

              {this.state.product.desc &&
                <div>
                  <h4 className="mt-5 p-3">Mô tả sản phẩm</h4>
                  <p>{this.state.product.desc}</p>
                </div>
              }

              <h4 className="mt-5 p-3">Sản phẩm liên quan</h4>
              <div className="row">
                {this.getRelated()}
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>

    );
  }
 }