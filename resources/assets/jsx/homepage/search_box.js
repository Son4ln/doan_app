import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { uuid } from './utils';

export default class SearchBox extends React.Component  {

  constructor() {
    super();

    this.state = {
      searchResult: []
    }

    this.initData = this.initData.bind(this);
    this.getValue = this.getValue.bind(this);
    this.showResult = this.showResult.bind(this);
  }

  componentDidMount() {
    $('#search-btn').on('click', this.getValue);
  }

  initData(data) {
    this.setState({
      searchResult: data
    });

    $('#search-btn').html('Tìm kiếm');
    $('#search-btn').removeClass('disabled');
  }

  getValue() {
    $('#search-btn').html('Đang tìm kiếm...');
    $('#search-btn').addClass('disabled');
    let value = $('#search-field').val().trim();

    axios.post('/api/search', {
      value: value
    }).then(res => this.initData(res.data))
    .catch (err => this.getErr(err.response));
  }

  getErr (err) {
    if (err.data.msg === 'not found' && err.status === 400) {
      $('.search-result').removeClass('d-none');
      $('#search-btn').html('Tìm kiếm');
      $('#search-btn').removeClass('disabled');
      $('.not-found').removeClass('d-none');
    }
  }

  showResult() {
    let searchResult = this.state.searchResult;
    let arr = [];
    if (searchResult.length > 0) {
      $('.search-result').removeClass('d-none');
      for (let item of searchResult) {
        let key = uuid();

        let imgUrl = `/storage/products/${item.images}`;
        let detailUrl = `/chi-tiet-san-pham/${item.id}`;

        let content = (
          <div key={key} className="row mx-0">
            <div className="col-4">
              <img src={imgUrl} className="img-fluid"/>
            </div>

            <div className="col-8">
              <h5 className="font-weight-bold mt-3">{item.name}</h5>
              <Link to={detailUrl} className="btn btn-primary rounded-0">Xem chi tiết</Link>
            </div>
          </div>
        );

        arr.push(content);
      }
    }

    return arr;
  }

  render() {
    return(
      <div className="search-box d-flex align-items-center">
        <div className="search-form mx-auto">
          <h3 className="text-white mx-auto text-center font-weight-bold">
            Vật liệu Đỗ An cam kết luôn mang đến cho quý khách hàng<br/>
            những sản phẩm có chất lượng tốt nhất
          </h3>

          <div className="input-group px-5 mt-3 position-relative">
            <input type="text" id="search-field" className="form-control" placeholder="Tìm kiếm sản phẩm bạn muốn" />
            <div className="input-group-append">
              <button id="search-btn" className="btn btn-success" type="button">Tìm kiếm</button>
            </div>
            <div className="search-result position-absolute d-none">
              <div className="not-found d-none">Không tìm thấy sản phẩm !!!</div>
              {this.showResult()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}