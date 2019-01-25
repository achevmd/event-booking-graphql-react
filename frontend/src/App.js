import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: '',
    userId: ''
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token,
      userId
    });
  };
  logout = () => {
    this.setState({
      token: '',
      userId: ''
    });
  };
  render() {
    const { token, userId } = this.state;
    return (
      <Router>
        <>
          <AuthContext.Provider value={{
            token: token,
            userId: userId,
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
                {!token && <Redirect path="/bookings" to="/auth"/>}
                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={EventsPage} />
                {token && <Route path="/bookings" component={BookingsPage} />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </Router>
    );
  }
}

export default App;
