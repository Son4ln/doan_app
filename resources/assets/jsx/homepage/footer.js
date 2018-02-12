import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  constructor() {
    super();

    this.state = {
      company: {}
    }

    this.getCompany = this.getCompany.bind(this);
  }

  componentWillMount() {
    axios.get('/api/client-get-company').then(res => this.getCompany(res.data));
  }

  getCompany(data) {
    this.setState({
      company: data
    });
  }

  render() {
    return(
      <footer className="home-footer mt-4 py-3 bg-white">
        <div className="footer-box mx-auto text-center">
          <h4 className="text-success text-uppercase">{this.state.company.name}</h4>
          <span>Địa chỉ:</span> {this.state.company.address}<br/>
          <span>Điên thoại:</span> {this.state.company.phone} - <span>Fax:</span> {this.state.company.fax}<br/>
          <span>Email:</span> {this.state.company.email} - <span>Website:</span>
          <a href={this.state.company.website}>{this.state.company.website}</a><br/>
        </div>
        
        {this.state.company.facebook_message &&
          <div className="message">
            <a href={this.state.company.facebook_message}>
              <img className="img-fluid" src="/images/message.png"/>
            </a>
          </div>
        }
      </footer>
    );
  }
}