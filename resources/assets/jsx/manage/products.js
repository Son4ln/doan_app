import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

export default class Products extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productId: 0,
      categories:[],
      logo: '/images/1.jpg',
      imgUpload: null,
      formErr: [],
      size: 10000000
    }

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    };

    this.deleteProducts = this.deleteProducts.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.getCate = this.getCate.bind(this);
    this.reviewImg = this.reviewImg.bind(this);
    this.clearReview = this.clearReview.bind(this);
    this.insertProduct = this.insertProduct.bind(this);
    this.initData = this.initData.bind(this);
    this.showProducts = this.showProducts.bind(this);
  }

  componentWillMount() {
    axios.get('/api/get-products').then(res => this.initData(res.data));
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('products');

    $('#del-confirm').on('click', this.confirmDelete);

    $('#click-to-select').click(() => {
      $('#select-file').click();
    });

    $('#clear-review').click(this.clearReview);

    $('#insert-form').submit(this.insertProduct);
  }

  initData(data) {
    $('#pr-loading').addClass('d-none');
    this.setState({
      products: data.products,
      categories: data.categories
    });
  }

  showProducts() {
    let products = this.state.products;
    let list = [];
    if (products.length > 0) {
      for (let [key, item] of products.entries()) {
        let btnDel = (
          <button data-act="del-products" onClick={this.deleteProducts} className="btn btn-danger" data-id={item.id}>
            <i className="fa fa-trash"></i>
          </button>
        );

        let editUrl = `/edit/${item.id}`;
        let btnEdit = (
          <Link className="btn btn-success" to={editUrl}><i className="fa fa-edit"></i></Link>
        );

        let imgUrl = `/storage/products/${item.images}`;
        let content = {
          name: item.name,
          img: imgUrl,
          cate: item.cate_name,
          action: [btnEdit, btnDel],
        };

        list.push(content);
      }
    }

    return list;
  }

  dataImg(cell, row) {
    let content = (
      <img src={cell} height="50"/>
    );
    return content;
  }

  detailLink(cell, row) {
    let content = (
      <div>
        {cell[0]} | {cell[1]}
      </div>
    );
    return content;
  }

  deleteProducts(e) {
    let target = $(e.target);
    if ($(e.target).is('i')) {
      target = $(e.target).parent();
    }

    let productId = target.data('id');

    this.setState({
      productId: productId
    });

    $('#del-modal').modal();
  }

  confirmDelete() {
    $('#pr-loading').removeClass('d-none');
    let data = {
      product_id: this.state.productId
    }

    $('#del-confirm').html('Đang xóa...');
    $('#del-confirm').addClass('disabled');
    axios.put('/api/delete-products', data).then(res => {
      $('#del-modal').modal('hide');
      $('#del-confirm').html('Xóa');
      $('#del-confirm').removeClass('disabled');
      axios.get('/api/get-products').then(res => this.initData(res.data));
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

  insertProduct(e) {
    e.preventDefault();
    let errorArr = [];

    if ($('#select-file').val() === '') {
      let nameErr = 'Vui lòng chọn hình ảnh';
      errorArr.push(nameErr);
    } else {
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

    if ($('#name').val() === '') {
      let nameErr = 'Vui lòng nhập tên sản phẩm';
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
      name: $('#name').val(),
      parameter: $('#parame').val(),
      desc: $('#desc').val(),
      cate_id: $('#cate').val(),
      file: this.state.imgUpload
    }

    $('#insert-submit').addClass('disabled');
    $('#insert-submit').html('Đang thêm sản phẩm...');

    axios.post('/api/insert-product', data).then(res => {
      e.target.reset();
      this.clearReview();
      $('#error').addClass('d-none');

      $('#insert-submit').removeClass('disabled');
      $('#insert-submit').html('Thêm sản phẩm');

      this.setState({
        formErr: []
      });
      axios.get('/api/get-products').then(res => this.initData(res.data));
    }).catch(err => {
      if (err.response.status === 422) {
        $('#insert-submit').removeClass('disabled');
        $('#insert-submit').html('Thêm sản phẩm');
        $('#error').removeClass('d-none');
        this.setState({
          formErr: [err.response.data.name[0]]
        });

        return;
      }
      alert('Đã xảy ra lỗi trong quá trình thực hiện vui lòng thử lại');
    });
  }

  render() {
    const options = {
      sizePerPage: 5,
      sizePerPageList: [ 5, 10, 15, 20 ]
    };

    return(
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-holder">
                  <h1 className="main-title float-left">Quản Trị Sản Phẩm
                  <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"><Link to="/">Bảng điều khiển</Link></li>
                    <li className="breadcrumb-item text-secondary">Sản phẩm</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
            
            <div className="products-content py-3">
              <button className="btn btn-primary float-left" data-toggle="modal" data-target="#insert-modal">Thêm sản phẩm</button>
              <BootstrapTable data={this.showProducts()} striped search pagination bordered={false}
                tableContainerClass="background-white" options={ options }>
                <TableHeaderColumn isKey dataField="name" dataSort width="25%">
                  Tên
                </TableHeaderColumn>

                <TableHeaderColumn dataFormat={this.dataImg} dataField="img" dataSort width="25%">
                  Hình ảnh
                </TableHeaderColumn>

                <TableHeaderColumn dataField="cate" dataSort width="25%">
                  Loại sản phẩm
                </TableHeaderColumn>

                <TableHeaderColumn dataFormat={this.detailLink} dataField="action" dataSort width="25%">
                  Hành động
                </TableHeaderColumn>
              </BootstrapTable>
            </div>

          </div>
        </div>

        <div className="modal fade" id="del-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Xóa Sản Phẩm</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div className="modal-body">
                Bạn có chắc muốn xóa sản phẩm này
              </div>
              
              <div className="modal-footer">
                <button type="button" id="del-confirm" className="btn btn-danger">Xóa</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
              </div>
              
            </div>
          </div>
        </div>

        <div className="modal fade" id="insert-modal">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Thêm sản phẩm</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div className="modal-body">
                <form id="insert-form">
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
                        <input id="name" name="productName" className="form-control" />
                      </div>

                      <div className="form-group">
                        <label>Thông số</label>
                        <textarea id="parame" name="productParam" className="form-control"></textarea>
                      </div>

                      <div className="form-group">
                        <label>Mô tả</label>
                        <textarea id="desc" name="productDesc" className="form-control"></textarea>
                      </div>

                      <div className="form-group">
                        <label>Loại sản phẩm</label>
                        <select id="cate" name="productCate" className="form-control">
                          {this.getCate()}
                        </select>
                      </div>

                      <div id="error" className="alert alert-danger d-none">
                        <ul className="mb-0">
                          {this.state.formErr}
                        </ul>
                      </div>

                      <div className="form-group">
                        <button id="insert-submit" className="btn btn-primary" type="submit">Thêm sản phẩm</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}