import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';
import { login, createUser } from '../requests/auth';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = e => {
    this.setState(prevState => {
      return {
        isLogin: !prevState.isLogin
      }
    });
  }

  submitHandler = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let req;
    if (this.state.isLogin) {
      req = login(email, password);
    } else {
      req = createUser(email, password);
    }
    req.then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      if (res.data.data.login.token) {
        const { token } = res.data.data.login;
        this.context.login(token);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div className="auth-wrapper">
        <h2 className="auth-form__title">{isLogin ? 'Login' : 'Signup'}</h2>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="submit">
              Submit
            </button>
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
          </div>
        </form >
      </div>
    );
  }
}

export default AuthPage;