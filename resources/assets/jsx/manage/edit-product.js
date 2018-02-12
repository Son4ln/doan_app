import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class EitProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      size: 10000000,
      logo: '',
      productCate: '',
      productName: '',
      productParam: '',
      productDesc: '',
      categories:[],
      formErr:[],
      imgUpload: null
    }

    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

    this.reviewImg = this.reviewImg.bind(this);
    this.clearReview = this.clearReview.bind(this);
    this.getCate = this.getCate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
  }

  componentWillMount() {
    axios.get(`/api/get-product/${this.props.match.params.id}`).then(res => this.initData(res.data));
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('products');

    $('#click-to-select').click(() => {
      $('#select-file').click();
    });

    $('#clear-review').click(this.clearReview);

    $('#edit-form').submit(this.validation);
  }

  initData(data) {
    $('#pr-loading').addClass('d-none');
    let param = '';
    let desc = '';
    if (data.product.parameter) {
      param = data.product.parameter;
    }

    if (data.product.desc) {
      desc = data.product.desc;
    }
    
    this.setState({
      logo: `/storage/products/${data.product.images}`,
      productCate: data.product.cate_id,
      productName: data.product.name,
      productParam: param,
      productDesc: desc,
      categories: data.categories
    });
  }

  getCate() {
    let categories = this.state.categories;
    let content = null;
    let optionArr = [];

    for (let [index, item] of categories.entries()) {
      content = (
        <option key={index} value={item.id}>{item.name}</option>
      );

      optionArr.push(content);
    }

    return optionArr;
  }

  validation(e) {
    e.preventDefault();
    let errorArr = [];
    if ($('#name').val() === '') {
      let nameErr = 'Vui lòng nhập tên sản phẩm';
      errorArr.push(nameErr);
    }

    if ($('#select-file').val() !== '') {
      let validExtensions = ['jpg','png','jpeg'];
      var fileName = document.getElementById('select-file').files[0];
      if ($.inArray($('#select-file').val().split('.').pop().toLowerCase(), validExtensions) === -1) {
        let nameErr = 'Vui lòng chọn ảnh có định dạng jpg, png, jpeg';
        errorArr.push(nameErr);
      }

      if (fileName.size > this.state.size) {
        let nameErr = 'Vui lòng chọn ảnh có kích thước nhỏ hơn 10mb';
        errorArr.push(nameErr);
      }
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
      name: $('#name').val(),
      parameter: $('#parame').val(),
      desc: $('#desc').val(),
      cate_id: $('#cate').val(),
      file: this.state.imgUpload
    }

    $('#edit-submit').addClass('disabled');
    $('#edit-submit').html('Đang cập nhật...')
    axios.put(`/api/update-product/${this.props.match.params.id}`, data).then(res => {
      $('#edit-submit').removeClass('disabled');
      $('#edit-submit').html('Cập Nhật');
      $('#error').addClass('d-none');
      this.setState({
        formErr: []
      });
    }).catch(err => {
      if (err.response.status === 422) {
        $('#error').removeClass('d-none');
        this.setState({
          formErr: [err.response.data.name[0]]
        });

        return;
      }

      alert('Đã xảy ra lỗi trong quá trình thực hiện vui lòng thử lại');
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

  render() {
    return(
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-holder">
                  <h1 className="main-title float-left">Chỉnh Sửa Sản Phẩm
                  <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"><Link to="/">Bảng điều khiển</Link></li>
                    <li className="breadcrumb-item"><Link to="/products">Sản phẩm</Link></li>
                    <li className="breadcrumb-item text-secondary">Chỉnh sửa sản phẩm</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>

            <div className="edit-product-content">
              <form id="edit-form">
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
                      <label>Tên sản phẩm</label>
                      <input id="name" onChange={this.handleChange} value={this.state.productName}
                      name="productName" className="form-control" />
                    </div>

                    <div className="form-group">
                      <label>Thông số</label>
                      <textarea id="parame" onChange={this.handleChange} value={this.state.productParam}
                      name="productParam" className="form-control"></textarea>
                    </div>

                    <div className="form-group">
                      <label>Mô tả</label>
                      <textarea id="desc" onChange={this.handleChange} value={this.state.productDesc}
                      name="productDesc" className="form-control"></textarea>
                    </div>

                    <div className="form-group">
                      <label>Loại sản phẩm</label>
                      <select id="cate" name="productCate" onChange={this.handleChange} value={this.state.productCate} className="form-control">
                        {this.getCate()}
                      </select>
                    </div>

                    <div id="error" className="alert alert-danger d-none">
                      <ul className="mb-0">
                        {this.state.formErr}
                      </ul>
                    </div>

                    <div className="form-group">
                      <button id="edit-submit" className="btn btn-primary" type="submit">Cập Nhật</button>
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