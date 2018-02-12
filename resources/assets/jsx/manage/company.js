import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Company extends React.Component {
  constructor() {
    super();

    this.state = {
      formErr: [],
      name: '',
      phone: '',
      fax: '',
      email: '',
      website: '',
      address: '',
      facebook: '',
      facebook_message: ''
    }

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    };

    this.updateCompany = this.updateCompany.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.initData = this.initData.bind(this);
  }

  componentWillMount() {
    axios.get('/api/get-company').then(res => this.initData(res.data));
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('company');

    $('#update-form').submit(this.updateCompany);
  }

  initData(data) {
    let facebook = '';
    if (data.facebook) {
      facebook = data.facebook;
    }

    let facebook_message = '';
    if (data.facebook_message) {
      facebook_message = data.facebook_message;
    }

    let fax = '';
    if (data.fax) {
      fax = data.fax;
    }

    let website = '';
    if (data.website) {
      website = data.website;
    }

    this.setState({
      name: data.name,
      phone: data.phone,
      fax: fax,
      email: data.email,
      website: website,
      address: data.address,
      facebook: facebook,
      facebook_message: facebook_message
    });

    $('#pr-loading').addClass('d-none');
  }

  updateCompany(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let phone = this.state.phone.trim();
    let fax = this.state.fax.trim();
    let email = this.state.email.trim();
    let website = this.state.website.trim();
    let address = this.state.address.trim();
    let facebook = this.state.facebook.trim();
    let facebook_message = this.state.facebook_message.trim();

    let errorArr = [];

    if (name === '') {
      let nameErr = 'Vui lòng nhập tên công ty';
      errorArr.push(nameErr);
    }

    if (phone === '') {
      let nameErr = 'Vui lòng nhập số điện thoại';
      errorArr.push(nameErr);
    }

    if (email === '') {
      let nameErr = 'Vui lòng nhập email';
      errorArr.push(nameErr);
    }

    if (address === '') {
      let nameErr = 'Vui lòng nhập địa chỉ';
      errorArr.push(nameErr);
    }

    if (errorArr.length > 0) {
      let ErrList = [];
      $('#error').removeClass('d-none');
      let content = null;
      for (let [index, item] of errorArr.entries()) {
        content = (
          <li key={index}>{item}</li>
        );

        ErrList.push(content);
      }
      
      this.setState({
        formErr: ErrList
      });

      return;
    }

    let data = {
      name: name,
      phone: phone,
      fax: fax,
      email: email,
      website: website,
      address: address,
      facebook: facebook,
      facebook_message: facebook_message
    }

    $('#update-submit').html('Đang cập nhật...');
    $('#update-submit').addClass('disabled');
    axios.put('/api/update-company', data).then(res => {
      $('#update-submit').html('Cập nhập');
      $('#update-submit').removeClass('disabled');
      $('#error').addClass('d-none');
      this.setState({
        formErr: []
      });
    }).catch(err => {
      ('#update-submit').html('Cập nhập');
      $('#update-submit').removeClass('disabled');
      alert('Đã xảy ra lỗi trong quá trình thực hiện vui lòng thử lại');
    });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }


  render() {
    return(
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-holder">
                  <h1 className="main-title float-left">Quản Lý Thông Tin Công Ty
                  <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"><Link to="/">Bảng điều khiển</Link></li>
                    <li className="breadcrumb-item text-secondary">Thông Tin Công Ty</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>

            <div className="company-info">
              <form id="update-form">
                <div className="row">
                  <div className="col-8">
                    <div className="form-group">
                      <label>Tên công ty</label>
                      <input id="name" value={this.state.name} name="name" className="form-control"
                      onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input id="phone" value={this.state.phone} name="phone" className="form-control"
                      onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Fax</label>
                      <input id="fax" value={this.state.fax} name="fax" className="form-control"
                      onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input id="email" value={this.state.email} type="email" name="email" className="form-control"
                      onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Website</label>
                      <input id="website" value={this.state.website} name="website" className="form-control"
                      onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Địa chỉ</label>
                      <textarea id="address" value={this.state.address} name="address" className="form-control"
                      onChange={this.handleChange}></textarea>
                    </div>

                    <div className="form-group">
                      <label>Facebook</label>
                      <input id="facebook" value={this.state.facebook} name="facebook" className="form-control"
                      onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Facebook Message</label>
                      <input id="mess" name="facebook_message" value={this.state.facebook_message} className="form-control"
                      onChange={this.handleChange}/>
                    </div>

                    <div id="error" className="alert alert-danger d-none">
                      <ul className="mb-0">
                        {this.state.formErr}
                      </ul>
                    </div>

                    <div className="form-group">
                      <button id="update-submit" className="btn btn-primary" type="submit">Cập nhập</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}