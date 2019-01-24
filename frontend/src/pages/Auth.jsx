import React, { Component } from 'react';
import axios from 'axios'
import './Auth.css';

class AuthPage extends Component {
  state = {
    isLogin: true
  };
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
    console.log(email, password);
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let reqBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };
    if (!this.state.isLogin) {
      reqBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }
    axios.post('http://localhost:8000/graphql', reqBody).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      console.log(res);
      return res.data;
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div className="auth-wrapper">
        <h2 className="auth-form__title">{isLogin ? 'Signup' : 'Login'}</h2>
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