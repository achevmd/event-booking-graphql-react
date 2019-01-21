import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FiAlignLeft, FiX } from 'react-icons/fi'
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
  render() {
    return (
      <>
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Event Booking Project</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              <li><NavLink to="/auth">Authentication</NavLink></li>
              <li><NavLink to="/events">Events</NavLink></li>
              <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
          </nav>
          <div onClick={this.handleNav} className="navigation-open-btn"><FiAlignLeft size="2rem" /></div>
        </header>
        <header className={this.state.isOpen ? 'mobile-navigation-open' : 'mobile-navigation'}>
          <div onClick={this.handleNav} className="mobile-navigation__close-btn"><FiX size="2rem" /></div>
          <nav className="mobile-navigation__items">
            <ul>
              <li><NavLink to="/auth">Authentication</NavLink></li>
              <li><NavLink to="/events">Events</NavLink></li>
              <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
};


export default MainNavigation;