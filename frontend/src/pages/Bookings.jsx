import React, { Component } from 'react';
import { bookings } from '../requests/booking';
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
    const res = await bookings();
    this.setState({ bookings: res.data.data.bookings, isLoading: false });
  };
  render() {
    return (
      <>
        <h1>The Bookings Page</h1>
        {this.state.bookings ?
          <BookingList bookings={this.state.bookings} />
          : <Spinner />}
      </>
    );
  }
}

export default BookingsPage;