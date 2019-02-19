import React, { Component } from 'react';
import { bookings, deleteBooking } from '../requests/booking';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BookingChart from '../components/Bookings/BookingChart/BookingChart';
import BookingControls from '../components/Bookings/BookingControls/BookingControls';

class BookingsPage extends Component {
  state = {
    bookings: [],
    isLoading: false,
    outputType: 'list'
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
  // Changes what's rendered on the page
  changeOutputHandler = outputType => {
    if (outputType === 'list') {
      this.setState({ outputType: 'list' });
    } else {
      this.setState({ outputType: 'chart' });
    }
  };
  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <>
          {this.state.outputType === 'list' && <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler} />}
          {this.state.outputType === 'chart' && <BookingChart bookings={this.state.bookings} />}
        </>
      );
    }
    return (
      <>
        <BookingControls handleChangeOutput={this.changeOutputHandler} activeOutput={this.state.outputType} />
        {content}
      </>
    );
  }
}

export default BookingsPage;