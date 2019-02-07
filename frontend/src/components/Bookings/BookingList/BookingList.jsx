import React from 'react';
import './BookingList.css';
import BookingItem from './BookingItem/BookingItem';

const BookingList = props => (
  props.bookings.map(booking => {
    return <BookingItem booking={booking}/>
  })
);

export default BookingList;