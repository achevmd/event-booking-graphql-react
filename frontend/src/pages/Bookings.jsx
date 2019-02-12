import React, { Component } from 'react';
import { bookings, deleteBooking } from '../requests/booking';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList/BookingList';

class BookingsPage extends Component {
  state = {
    bookings: [],
    isLoading: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.fetchBookings();
  }
  fetchBookings = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await bookings();
      this.setState({ bookings: res.data.data.bookings, isLoading: false });
    } catch (err) {
      console.log(err);
    }
  };
  deleteBookingHandler = async id => {
    this.setState({ isLoading: true });
    try {
      await deleteBooking(id);
      this.setState(prevState => {
        const updatedBookings = prevState.bookings.filter(b => b._id !== id);
        return {
          bookings: updatedBookings,
          isLoading: false
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <>
        <h1>My Bookings</h1>
        {this.state.isLoading ?
          <Spinner />
          : <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler} />}
      </>
    );
  }
}

export default BookingsPage;