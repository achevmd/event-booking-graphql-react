import React from 'react';
import './BookingList.css';
import BookingItem from './BookingItem/BookingItem';

const BookingList = props => (
  <ul className="booking__list">
    {props.bookings.map(booking => {
      return <BookingItem key={booking._id} booking={booking} onDelete={props.onDelete} />
    })}
  </ul>
);

export default BookingList;