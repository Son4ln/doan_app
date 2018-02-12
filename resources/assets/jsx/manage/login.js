import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor() {
    super();

    // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;
  }

  componentDidMount() {
    $('.login-form').on('submit', this.loginSubmit);
  }

  loginSubmit(e) {
    e.preventDefault();
    let email = $('[name="email"]').val();
    let pass = $('[name="pass"]').val();

    let dataLogin = {
      email: email,
      pass: pass
    }

    axios.post('/login-act', dataLogin)
    .then(res => {
      if (res.data === 'login') {
        window.location.href = '/dashboard';
      } 
    })
    .catch(err => {
      if (err.response.data.msg === 'login fail') {
        $('#alert-login').removeClass('d-none');
      }
    });
  }

  render() {
    return(
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4 offset-lg-4">
            <center>ĐĂNG NHẬP</center>
            <form className="login-form rounded">
              <div id="alert-login" className="d-none alert alert-danger">Sai Email hoặc mật khẩu</div>
              <input name="email" type="email" required className="form-control mb-2" placeholder="Email"/>
              <input name="pass" type="password" required className="form-control mb-2" placeholder="Mật khẩu"/>
              <button type="submit" className="btn btn-success btn-block">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Login />, document.getElementById('app'));