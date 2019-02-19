import React from 'react';
import './BookingControls.css';

const BookingControls = (props) => (
  <div className="booking-control">
    <button className={props.activeOutput === 'list' ? 'active' : ''} onClick={props.handleChangeOutput.bind(this, 'list')}>List</button>
    <button className={props.activeOutput === 'chart' ? 'active' : ''} onClick={props.handleChangeOutput.bind(this, 'chart')}>Chart</button>
  </div>
);

export default BookingControls;