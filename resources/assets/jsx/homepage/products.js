import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';
import SearchBox from './search_box';
import Aside from './aside';
import Footer from './footer';

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      category: '',
      limiter: 0,
      reload: false
    }

    this.initData = this.initData.bind(this);
    this.showProducts = this.showProducts.bind(this);
    this.navigator = this.navigator.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.cate_id !== 'all') {
      let cate_id = this.props.match.params.cate_id;
      axios.post('/api/client-get-products', {cate_id: cate_id})
      .then(res => this.initData(res.data)).catch(err => this.getErr(err.response));;
    } else {
      axios.get('/api/client-get-products').then(res => this.initData(res.data))
      .catch(err => this.getErr(err.response));
    }

    axios.get('/api/client-get-categories').then(res => this.getCate(res.data));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentPage = this.props.current_page;
    currentPage('products');

    $('#next-products').click(this.navigator);
    $('#pre-products').click(this.navigator);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.reload === true) {
      $('#pr-loading').removeClass('d-none');
      this.scrollToAnchor();
      
      if (nextProps.match.params.cate_id !== 'all') {
        let cate_id = nextProps.match.params.cate_id;
        axios.post('/api/client-get-products', {cate_id: cate_id})
        .then(res => this.initData(res.data)).catch(err => this.getErr(err.response));;

        axios.get('/api/client-get-categories').then(res => this.getCate(res.data));
      } else {
        axios.get('/api/client-get-products').then(res => this.initData(res.data))
        .catch(err => this.getErr(err.response));
        this.setState({
          category: 'Tất cả sản phẩm'
        });
      }
    }

    this.setState({
      reload: true
    });
  }

  getErr(err) {
    if (err.data.msg === 'products not found' && err.status === 400) {
      $('#next-products').addClass('d-none');
      $('#pre-products').addClass('d-none');
    }
  }

  scrollToAnchor() {
    $('html, body').animate({
      'scrollTop':   $('#home-content').offset().top - 60
    }, 500);
  }

  catchErr(err) {
    $('#next-products').addClass('d-none');
  }

  initData(data) {
    this.setState({
      products: data
    });

    $('#pr-loading').addClass('d-none');
    if (this.state.limiter === 0) {
      $('#pre-products').addClass('d-none');
    } else {
      $('#pre-products').removeClass('d-none');
    }

    if (data.length !== 12) {
      $('#next-products').addClass('d-none');
    } else {
      $('#next-products').removeClass('d-none');
    }
  }

  getCate(data) {
    let category = 'Tất cả sản phẩm';
    if (this.props.match.params.cate_id !== 'all') {
      let index = data.findIndex((element) => {
        return element.id == this.props.match.params.cate_id;
      });

      category = data[index].name;
    }

    this.setState({
      category: category
    });
  }

  addRow(block) {
    let key = uuid();
    return (
      <div key={key} className="row mt-3">
        {block}
      </div>
    );
  }

  showProducts() {
    let products = this.state.products;

    if (products.length > 0) {
      let productArr = [];
      let rowArr = [];
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

        if (productArr.length === 4) {
          let addRow = this.addRow(productArr);
          rowArr.push(addRow);
          productArr = [];
        }
      }

      let addRow = this.addRow(productArr);
      rowArr.push(addRow);

      return rowArr;
    }

    return (<h1 className="text-center mt-5">Không có sản phẩm !!!</h1>);
  }

  navigator(e) {
    $('#pr-loading').removeClass('d-none');
    let target = $(e.target);
    if ($(e.target).is('i')) {
      target = $(e.target).parent();
    }

    target.attr("disabled", true);
    let skip = this.state.limiter + 12;

    if (target.attr('id') === 'pre-products') {
      skip = this.state.limiter - 12;
    }

    this.setState({
      limiter: skip
    });

    let data = {
      skip: skip
    }
    axios.post('/api/client-get-products', data).then(res => {
        this.initData(res.data);
        target.attr("disabled", false);
    }).catch(err => this.catchErr(err.response));
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
              <h4 className="p-3 mb-0">{this.state.category}</h4>
              {this.showProducts()}

              <div className="row mt-3">
                <div className="col-2 offset-lg-4 d-flex justify-content-center">
                  <button id="pre-products" className="btn btn-info"><i className="fa fa-arrow-left"></i></button>
                </div>

                <div className="col-2 d-flex justify-content-center">
                  <button id="next-products" className="btn btn-info"><i className="fa fa-arrow-right"></i></button>
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