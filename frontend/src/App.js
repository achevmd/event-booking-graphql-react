import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './App.css';

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: '',
    email: '',
    userId: ''
  };

  login = (token) => {
    const decoded = jwtDecode(token);
    this.setState({
      token,
      email: decoded.email,
      userId: decoded.userId
    });
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  logout = () => {
    this.setState({
      token: '',
      userId: ''
    });
    localStorage.removeItem('token');
  };
  componentDidMount() {
    const token = localStorage.getItem('token');
    try {
      const decoded = jwtDecode(token);
      if (token) {
        const {email, userId, exp : tokenExpiration} = decoded;
        const currentTime = Date.now() / 1000;
        // CHECKS IF TOKEN IS EXPIRED
        if (tokenExpiration < currentTime) {
          this.logout();
          return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.setState({
          token,
          email,
          userId
        });
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
  }
  render() {
    const { token, email, userId } = this.state;
    return (
      <Router>
        <>
          <AuthContext.Provider value={{
            token: token,
            userId: userId,
            email: email,
            login: this.login,
            logout: this.logout
          }}>
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {token
                  ? <Redirect path="/auth" to="/events" />
                  : <Redirect path="/" to="/auth" exact />
                }
                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={EventsPage} />
                {token && <Route path="/bookings" component={BookingsPage} />}
                {!token && <Redirect path="/bookings" to="/auth" />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </Router>
    );
  }
}

export default App;
