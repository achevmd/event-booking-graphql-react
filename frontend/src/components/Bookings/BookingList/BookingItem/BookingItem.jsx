import React from 'react';
import './BookingItem.css';

const BookingItem = props => {
  const { _id, event, user, createdAt } = props.booking;
  return (
    <li className="booking__item">
      <div className="booking__item-data">
        <p>{event.title}</p>
        <p>Booked on: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Booked by: {user.email}</p>
      </div>
      <div className="booking__item-actions">
        <button className="red" onClick={props.onDelete.bind(this, _id)}>Cancel Booking</button>
      </div>
    </li>
  );
}

export default BookingItem;