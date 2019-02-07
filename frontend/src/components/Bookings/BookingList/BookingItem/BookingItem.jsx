import React from 'react';
import './BookingItem.css';

const BookingItem = props => {
  const { _id, event, user, createdAt } = props.booking;
  return (
    <div key={_id}>
      <p>{_id}</p>
      <p>{event.title}</p>
      <p>Booked on: {new Date(createdAt).toLocaleDateString()}</p>
      <p>Booked by: {user.email}</p>
    </div>
  );
}

export default BookingItem;