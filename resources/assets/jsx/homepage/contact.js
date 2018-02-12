import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';
import SearchBox from './search_box';
import Footer from './footer';

export default class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      contact: {},
      company: {},
      contact_img: ''
    }
  }

  componentWillMount() {
    axios.get('/api/client-get-contact').then(res => this.getContact(res.data));
    axios.get('/api/client-get-company').then(res => this.getCompany(res.data));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentPage = this.props.current_page;
    currentPage('contact');
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

  getCompany(data) {
    this.setState({
      company: data
    });

    $('#pr-loading').addClass('d-none');
  }


  render() {
    return(
      <div className="container-fluid px-0">
        <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        <SearchBox/>

        <div id="home-content" className="home-content">
          <div className="row mx-0">
            <div className="col-12">
              <div className="aside-right">
                <h4 className="p-3 mb-0 text-center">Thông Tin Liên Hệ</h4>
              </div>
            </div>
          </div>

          <div className="row mt-3 mx-0">
            <div className="col-lg-6">
              <div className="row mx-0">
                <div className="col-lg-6 text-center">
                  <img src={this.state.contact_img} className="img-fluid"/>
                </div>

                <div className="col-lg-6 border border-success border-left-0 border-top-0 border-bottom-0">
                  <h5 className="text-success mt-4">Ông {this.state.contact.name}</h5>
                  <p className="my-0"><span className="font-weight-bold">Chức vụ:</span> {this.state.contact.position}</p>
                  <p><span className="font-weight-bold">Di Động: </span>
                  {this.state.contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <p className="mt-3"><span className="font-weight-bold">Fax:</span> {this.state.contact.fax}</p>
              <p><span className="font-weight-bold">Email:</span> {this.state.contact.email}</p>
              <p><span className="font-weight-bold">Địa chỉ:</span> {this.state.contact.adrress}</p>
            </div>
          </div>

          <div className="row mx-0 mt-4">
            <div className="col-12">
              <div className="aside-right">
                <h4 className="p-3 mb-0 text-center">Thông Tin Công Ty</h4>
              </div>
            </div>
          </div>

          <div className="row mt-4 mx-0">
            <div className="col-12">
              <div className="col-6 offset-3">
                <h4 className="text-success text-uppercase">{this.state.company.name}</h4>
                <p><span className="font-weight-bold">Địa chỉ:</span> {this.state.company.address}</p>
                <p><span className="font-weight-bold">Điên thoại:</span> {this.state.company.phone}</p>
                <p><span className="font-weight-bold">Fax:</span> {this.state.company.fax}</p>
                <p><span className="font-weight-bold">Email:</span> {this.state.company.email}</p>
                <p><span className="font-weight-bold">Website:</span> 
                  <a href={this.state.company.website}>{this.state.company.website}</a>
                </p>
                {this.state.company.facebook &&
                  <p><span className="font-weight-bold">Facebook:</span> 
                    <a href={this.state.company.facebook}>{this.state.company.facebook}</a>
                  </p>
                }
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}