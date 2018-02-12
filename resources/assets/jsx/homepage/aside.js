import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Aside extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      contact: {},
      contact_img: ''
    }

    this.getCate = this.getCate.bind(this);
    this.getContact = this.getContact.bind(this);
  }

  componentWillMount() {
    axios.get('/api/client-get-categories').then(res => this.getCate(res.data));
    axios.get('/api/client-get-contact').then(res => this.getContact(res.data));
  }

  getCate(data) {
    this.setState({
      categories: data
    });
  }

  getContact(data) {
    let imgUrl = '/images/1.jpg';
    if (data.images) {
      imgUrl = `/storage/${data.images}`;
    }

    this.setState({
      contact: data,
      contact_img: imgUrl
    });
  }

  showCate() {
    let categories = this.state.categories;
    if (categories.length > 0) {
      let cateArr = [];
      let content = null;
      for (let [index, item] of categories.entries()) {
        let url = `/san-pham/${item.id}`;
        content = (
          <Link key={index} className="list-group-item" to={url}>{item.name}</Link>
        );

        cateArr.push(content);
      }

      return cateArr;
    }
  }

  render() {
    return (
      <div className="col-lg-3 aside-left px-0">
        <div className="cate-box">
          <h4 className="text-white p-3 text-center bg-success mb-0">Loại sản phẩm</h4>
          <ul className="list-group">
            <Link className="list-group-item" to="/san-pham/all">Tất cả sản phẩm</Link>
            {this.showCate()}
          </ul>
        </div>

        <div className="card border-0 mt-3 text-center">
          <h4 className="text-white p-3 text-center bg-success mb-0">Thông tin liên hệ</h4>
          <img src={this.state.contact_img} className="img-fluid mx-auto px-3 mt-4"
          alt="Card image" />                

          <div className="card-body">
            <h4 className="card-title text-success">Ông {this.state.contact.name}</h4>
            <p className="card-text">{this.state.contact.position}</p>
            <p className="card-text text-primary">{this.state.contact.phone} - {this.state.contact.fax}</p>
            <Link to="/lien-he" className="btn btn-primary rounded-0">Xem chi tiết</Link>
          </div>
        </div>
      </div>
    );
  }
}