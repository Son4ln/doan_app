import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      dataCate: [],
      formErr: []
    }

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    };

    this.showCate = this.showCate.bind(this);
    this.saveToDelete = this.saveToDelete.bind(this);
    this.delConfirm = this.delConfirm.bind(this);
    this.insertCate = this.insertCate.bind(this);
    this.initData = this.initData.bind(this);
  }

  componentWillMount() {
    axios.get('/api/get-categories').then(res => this.initData(res.data));
  }

  componentDidMount() {
    let getPage = this.props.currentPage;
    getPage('categories');

    $('#del-confirm').click(this.delConfirm);
    $('#add-cate-form').submit(this.insertCate);
  }

  initData(data) {
    $('#pr-loading').addClass('d-none');
    this.setState({
      dataCate: data
    });
  }

  showCate() {
    let data = this.state.dataCate;
    let content = null;
    let showArr = [];
    if (data.length > 0) {
      for (let [index, item] of data.entries()) {
        let deleteBtn = (
        <button data-id={item.id} onClick={this.saveToDelete}
        className="btn btn-danger"><i className="fa fa-trash"></i></button>
        );

        content = {
          id: item.id,
          name: item.name,
          action: deleteBtn
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

  afterSaveCell (row) {
    if (row.name !== '') {
      let data = {
        name: row.name
      }
      axios.put(`/api/save-categories/${row.id}`, data)
      .then(res => {})
      .catch(err => {
        alert('đã xảy ra lỗi vui lòng thử lại')
      });
    }
  }

  saveToDelete(e) {
    let target = $(e.target);
    if ($(e.target).is('i')) {
      target = $(e.target).parent();
    }

    this.setState({
      cateId: target.data('id')
    });

    $('#del-modal').modal();
  }

  delConfirm() {
    let id = this.state.cateId;
    $('#del-confirm').html('Đang xóa...');
    $('#del-confirm').addClass('disabled');
    axios.put(`/api/del-categories/${id}`).then(res => {
      $('#del-confirm').removeClass('disabled');
      $('#del-confirm').html('Xóa');
      $('#del-modal').modal('hide');
      axios.get('/api/get-categories').then(res => this.initData(res.data));
    });
  }

  insertCate(e) {
    e.preventDefault();
    let name = $('[name="name"]').val().trim();
    let errorArr = [];
    if (name === '') {
      let descErr = 'Vui lòng nhập loại sản phẩm';
      errorArr.push(descErr);
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
      name:name
    }
    $('#pr-loading').removeClass('d-none');
    $('[type="submit"]').addClass('disabled');
    $('[type="submit"]').html('Đang thêm....');
    axios.post('/api/add-categories', data).then(res => {
      e.target.reset();
      axios.get('/api/get-categories').then(res => this.initData(res.data));
      $('#pr-loading').addClass('d-none');
      $('[type="submit"]').removeClass('disabled');
      $('[type="submit"]').html('Thêm loại sản phẩm');
      $('#error').addClass('d-none');
    }).catch(err => {
      $('[type="submit"]').removeClass('disabled');
      $('[type="submit"]').html('Thêm loại sản phẩm');
      if (err.response.status === 422) {
        $('#error').removeClass('d-none');
        this.setState({
          formErr: [err.response.data.name[0]]
        });

        return;
      }
    });
  }

  render() {
    const cellEdit = {
      mode: 'dbclick',
      blurToSave: true,
      afterSaveCell: this.afterSaveCell,
    };

    const tdStyle = {
      color: 'blue',
      cursor: 'pointer'
    }

    return(
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-holder">
                  <h1 className="main-title float-left">Quản Lý Loại Sản Phẩm
                  <i id="pr-loading" className="pr-loading fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"><Link to="/">Bảng điều khiển</Link></li>
                    <li className="breadcrumb-item text-secondary">Loại Sản Phẩm</li>
                  </ol>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>

            <div className="cate-content">
              <BootstrapTable data={this.showCate()} striped bordered={false}
              tableContainerClass="background-white cate-table" cellEdit={ cellEdit }>
                <TableHeaderColumn isKey dataField="id" dataSort width="25%">
                  Id
                </TableHeaderColumn>

                <TableHeaderColumn dataField="name" tdStyle={ tdStyle } editable={ true } dataSort width="25%">
                  Tên
                </TableHeaderColumn>

                <TableHeaderColumn dataFormat={this.showBtn} dataField="action" editable={ false } dataSort width="25%">
                  Thao tác
                </TableHeaderColumn>
              </BootstrapTable>

              <form id="add-cate-form" className="row mb-3">
                <div className="col-6">
                  <input className="form-control" name="name" placeholder="Nhập loại sản phẩm"/>
                </div>
                <div className="col-3">
                  <button type="submit" className="btn btn-block btn-success">Thêm loại sản phẩm</button>
                </div>
              </form>
              <div className="row">
                <div id="error" className="col-9 alert alert-danger d-none">
                  <ul className="mb-0">
                    {this.state.formErr}
                  </ul>
                </div>
              </div>
            </div>

            <div className="modal fade" id="del-modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Xóa Loại Sản Phẩm</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  <div className="modal-body">
                    Bạn có chắc muốn xóa loại sản phẩm này
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" id="del-confirm" className="btn btn-danger">Xóa</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
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