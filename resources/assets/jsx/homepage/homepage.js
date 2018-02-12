import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';
import SearchBox from './search_box';
import Aside from './aside';
import Footer from './footer';

export default class Homepage extends React.Component  {
  constructor() {
    super();

    this.state = {
      products: [],
    }

    
    this.getProducts = this.getProducts.bind(this);
  }

  componentWillMount() {
    axios.get('/api/client-get-products-limit').then(res => this.getProducts(res.data));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentPage = this.props.current_page;
    currentPage('homepage');
  }

  getProducts(data) {
    this.setState({
      products: data
    });

    $('#pr-loading').addClass('d-none');
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
        let imgUrl = `/storage/products/${item.images}`;
        let detailUrl = `/chi-tiet-san-pham/${item.id}`;
        content = (
          <div key={index} className="col-lg-3 mb-4">
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
  }

  render() {
    return(
      <div className="container-fluid px-0">
        <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        <SearchBox/>

        <div className="home-content">
          <div className="row mx-0">
          <Aside />  

            <div className="col-lg-9 aside-right">
              <h4 className="p-3 mb-0">Sản phẩm của chúng tôi</h4>
              {this.showProducts()}
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}