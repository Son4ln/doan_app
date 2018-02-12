import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      logo: '',
      size: 10000000,
      formErr: [],
      imgUpload: '',
      name: '',
      position: '',
      phone: '',
      fax: '',
      email: '',
      adrress: '',
      imgUpload: null
    }

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    };

    this.reviewImg = this.reviewImg.bind(this);
    this.clearReview = this.clearReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.initData = this.initData.bind(this);
  }

  componentWillMount() {
    axios.get('/api/get-contact').then(res => this.initData(res.data));
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('contact');

     $('#click-to-select').click(() => {
      $('#select-file').click();
    });

    $('#clear-review').click(this.clearReview);
    $('#update-form').submit(this.updateContact);
  }

  initData(data) {
    $('#pr-loading').addClass('d-none');

    let fax = '';
    if (data.fax) {
      fax = data.fax;
    }

    let images = '/images/1.jpg';

    if (data.images) {
      images = `/storage/${data.images}`;
    }
    this.setState({
      logo: images,
      name: data.name,
      position: data.position,
      phone: data.phone,
      fax: fax,
      email: data.email,
      address: data.adrress
    });
  }

  reviewImg() {
    let review = document.getElementById('review-img');
    let input = document.getElementById('select-file');
    let file = input.files[0];
    if (file.size < this.state.size) {
      if (file.type.indexOf('image') == 0) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          review.src = e.target.result;
          this.setState({
            imgUpload: e.target.result
          });
        }
      }
    }
  }

  clearReview() {
    let review = document.getElementById('review-img');
    review.src = this.state.logo;
    this.setState({
      imgUpload: null
    });
    $('#select-file').val('');
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  updateContact(e) {
    e.preventDefault();
    let images = this.state.imgUpload;
    let name = this.state.name.trim();
    let position = this.state.position.trim();
    let phone = this.state.phone.trim();
    let fax = this.state.fax.trim();
    let email = this.state.email.trim();
    let address = this.state.address.trim();
    let errorArr = [];

    if (name === '') {
      let nameErr = 'Vui lòng nhập họ và tên';
      errorArr.push(nameErr);
    }

    if (position === '') {
      let nameErr = 'Vui lòng nhập chức vụ';
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
      images: images,
      name: name,
      position: position,
      phone: phone,
      fax: fax,
      email: email,
      address: address
    }

    $('#update-submit').html('Đang cập nhật...');
    $('#update-submit').addClass('disabled');
    axios.put('/api/update-contact', data).then(res => {
      $('#update-submit').html('Cập nhập');
      $('#update-submit').removeClass('disabled');
      $('#error').addClass('d-none');
      this.setState({
        formErr: []
      });
    }).catch(err => {
      $('#update-submit').html('Cập nhập');
      $('#update-submit').removeClass('disabled');
      alert('Đã xảy ra lỗi trong quá trình thực hiện vui lòng thử lại');
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
                  <h1 className="main-title float-left">Quản Trị Liên Hệ
                  <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"><Link to="/">Bảng điều khiển</Link></li>
                    <li className="breadcrumb-item text-secondary">Liên Hệ</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>

            <div className="contact-content">
              <form id="update-form">
                <div className="row">
                  <div className="col-4">
                    <h5 className="text-center">Hình ảnh</h5>
                    <img src={this.state.logo} id="review-img" className="img-fluid d-block mx-auto"/>
                    <input type="file" onChange={this.reviewImg} className="d-none" id="select-file" />

                    <center>
                      <div className="btn-group my-3">
                        <button type="button" id="click-to-select" className="btn btn-primary"><i className="fa fa-folder-open"></i></button>
                        <button type="button" id="clear-review" className="btn btn-primary"><i className="fa fa-times"></i></button>
                      </div>
                    </center>
                  </div>
                  <div className="col-8">
                    <div className="form-group">
                      <label>Họ và Tên</label>
                      <input id="name" name="name" className="form-control"
                      value={this.state.name} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                      <label>Chức vụ</label>
                      <input id="position" name="position" className="form-control"
                      value={this.state.position} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input id="phone" name="phone" className="form-control"
                      value={this.state.phone} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Fax</label>
                      <input id="fax" name="fax" className="form-control"
                      value={this.state.fax} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" id="email" name="email" className="form-control"
                      value={this.state.email} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                      <label>Địa chỉ</label>
                      <textarea id="address" name="address" className="form-control"
                      value={this.state.address} onChange={this.handleChange}></textarea>
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