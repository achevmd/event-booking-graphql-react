import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FiAlignLeft, FiX } from 'react-icons/fi'

import AuthContext from '../../context/auth-context'
import './MainNavigation.css';


class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  handleNav = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }
  openNav = () => {
    this.setState({isOpen: true});
  }
  closeNav = () => {
    this.setState({isOpen: false});
  }
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <>
              <header className="main-navigation">
                <div className="main-navigation__logo">
                  <h1>EventBookingProject</h1>
                </div>
                <nav className="main-navigation__items">
                  <ul>
                    {!context.token && <li><NavLink to="/auth">Authentication</NavLink></li>}
                    <li><NavLink to="/events">Events</NavLink></li>
                    {context.token &&
                      <>
                        <li><NavLink to="/bookings">Bookings</NavLink></li>
                        <li><button onClick={context.logout}>Logout</button></li>
                      </>
                    }
                  </ul>
                </nav>
                <div onClick={this.openNav} className="mobile-navigation__open-btn"><FiAlignLeft size="2rem" /></div>
              </header>
              <header className={this.state.isOpen ? 'mobile-navigation--open' : 'mobile-navigation'}>
                <div onClick={this.closeNav} className="mobile-navigation__close-btn"><FiX size="2rem" /></div>
                <nav className="mobile-navigation__items">
                  <ul>
                    {!context.token && <li><NavLink to="/auth" onClick={this.closeNav}>Authentication</NavLink></li>}
                    <li><NavLink to="/events" onClick={this.closeNav}>Events</NavLink></li>
                    {context.token &&
                      <>
                        <li><NavLink to="/bookings" onClick={this.closeNav}>Bookings</NavLink></li>
                        <li><button onClick={context.logout} >Logout</button></li>
                      </>
                    }
                  </ul>
                </nav>
              </header>
            </>
          );
        }}

      </AuthContext.Consumer>
    );
  }
};


export default MainNavigation;