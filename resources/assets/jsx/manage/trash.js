import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

export default class Trash extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      categories: []
    }

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    };

    this.initData = this.initData.bind(this);
    this.showProducts = this.showProducts.bind(this);
    this.recoveryProduct = this.recoveryProduct.bind(this);
    this.confirmRecoverProducts = this.confirmRecoverProducts.bind(this);
    this.confirmRecoverCate = this.confirmRecoverCate.bind(this);
    this.recoveryCate = this.recoveryCate.bind(this);
    this.showCate = this.showCate.bind(this);
  }

  componentWillMount() {
    axios.get('/api/get-deleted').then(res => this.initData(res.data));
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('trash');

    $('#del-confirm-product').on('click', this.confirmRecoverProducts);
    $('#del-confirm-cate').on('click', this.confirmRecoverCate);
  }

  initData(data) {
    this.setState({
      products: data.products,
      categories: data.categories
    });

    $('#pr-loading').addClass('d-none');
  }

  showProducts() {
    let products = this.state.products;
    let list = [];
    if (products.length > 0) {
      for (let [key, item] of products.entries()) {
        let btnEdit = (
          <button className="btn btn-success" onClick={this.recoveryProduct}
          data-id={item.id}><i className="fa fa-eye"></i></button>
        );

        let imgUrl = `/storage/products/${item.images}`;
        let content = {
          name: item.name,
          img: imgUrl,
          cate: item.cate_name,
          action: btnEdit,
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
        {cell}
      </div>
    );
    return content;
  }

  recoveryProduct(e) {
    let target = $(e.target);
    if ($(e.target).is('i')) {
      target = $(e.target).parent();
    }

    let productId = target.data('id');

    this.setState({
      productId: productId
    });

    $('#confirm-product-modal').modal();
  }

  confirmRecoverProducts() {
    $('#pr-loading').removeClass('d-none');
    $('#del-confirm-product').html('Đang phục hồi...');
    $('#del-confirm-product').addClass('disabled');
    axios.put(`/api/recover-products/${this.state.productId}`).then(res => {
      axios.get('/api/get-deleted').then(res => this.initData(res.data));
      $('#confirm-product-modal').modal('hide');
      $('#del-confirm-product').html('Phục hồi');
      $('#del-confirm-product').removeClass('disabled');
    });
  }

  showCate() {
    let data = this.state.categories;
    let content = null;
    let showArr = [];
    if (data.length > 0) {
      for (let [index, item] of data.entries()) {
        let editBtn = (
        <button className="btn btn-success" onClick={this.recoveryCate}
        data-id={item.id}><i className="fa fa-eye"></i></button>
        );

        content = {
          id: item.id,
          name: item.name,
          action: editBtn
        }

        showArr.push(content);
      }
    }

    return showArr;
  }

  showBtn(cell, row) {
    let content = (
      <div>
        {cell}
      </div>
    );
    return content;
  }

  recoveryCate(e) {
    let target = $(e.target);
    if ($(e.target).is('i')) {
      target = $(e.target).parent();
    }

    let cateId = target.data('id');

    this.setState({
      cateId: cateId
    });

    $('#confirm-cate-modal').modal();

  }

  confirmRecoverCate() {
    $('#pr-loading').removeClass('d-none');
    $('#del-confirm-cate').html('Đang phục hồi...');
    $('#del-confirm-cate').addClass('disabled');
    axios.put(`/api/recover-cate/${this.state.cateId}`).then(res => {
      axios.get('/api/get-deleted').then(res => this.initData(res.data));
      $('#confirm-cate-modal').modal('hide');
      $('#del-confirm-cate').html('Phục hồi');
      $('#del-confirm-cate').removeClass('disabled');
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
                  <h1 className="main-title float-left">Thùng Rác
                  <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"><Link to="/">Bảng điều khiển</Link></li>
                    <li className="breadcrumb-item text-secondary">Thùng rác</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>

            <div className="trash-content">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#product-tab"
                  aria-selected="true">Sản phẩm</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="cate-tab" data-toggle="tab" href="#cate"
                  aria-selected="false">Loại sản phẩm</a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active py-4" id="product-tab">
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

                <div className="tab-pane fade py-4" id="cate">
                  <BootstrapTable data={this.showCate()} search pagination striped bordered={false}
                    tableContainerClass="background-white cate-table" options={ options }>
                      <TableHeaderColumn isKey dataField="id" dataSort width="25%">
                        Id
                      </TableHeaderColumn>

                      <TableHeaderColumn dataField="name" dataSort width="25%">
                        Tên
                      </TableHeaderColumn>

                      <TableHeaderColumn dataFormat={this.showBtn} dataField="action" editable={ false } dataSort width="25%">
                        Thao tác
                      </TableHeaderColumn>
                    </BootstrapTable>
                </div>
              </div>
              <div className="modal fade" id="confirm-product-modal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Phục Hồi Sản Phẩm</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <div className="modal-body">
                      Bạn có chắc muốn phục hồi sản phẩm này
                    </div>
                    
                    <div className="modal-footer">
                      <button type="button" id="del-confirm-product" className="btn btn-danger">Phục hồi</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="confirm-cate-modal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Phục Hồi Loại Sản Phẩm</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <div className="modal-body">
                      Bạn có chắc muốn phục hồi loại sản phẩm này
                    </div>
                    
                    <div className="modal-footer">
                      <button type="button" id="del-confirm-cate" className="btn btn-danger">Phục hồi</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}