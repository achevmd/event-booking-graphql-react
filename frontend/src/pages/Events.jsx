import React, { Component } from 'react';
import { events, createEvent } from '../requests/events';
import { bookEvent } from '../requests/booking';

import './Events.css';
import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import EventList from '../components/Events/EventList/EventList';
import Spinner from '../components/Spinner/Spinner';
import CreateEventModal from '../components/Modal/CreateEventModal';


class EventsPage extends Component {
  state = {
    // isCreating opens and closes the Create Event modal
    isCreating: false,
    events: [],
    selectedEvent: '',
    isLoading: false,
    error: false
  };
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.fetchEvents();
  }
  fetchEvents = () => {
    this.setState({ isLoading: true, error: false });
    events().then(res => {
      this.setState({
        events: res.data.data.events,
        isLoading: false
      });
    })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false, error: true });
      });
  };
  openCreateEventHandler = () => {
    this.setState({ isCreating: true });
  };
  closeModalHandler = () => {
    this.setState({ isCreating: false, selectedEvent: '' });
  };
  confirmCreateEventHandler = (formData) => {
    const { title, description, price, date } = formData;
    this.setState({ isCreating: false });
    if (title.trim().length === 0 || description.trim().length === 0 ||
      price <= 0 || date.trim().length === 0) {
      return;
    }
    const token = this.context.token;
    const event = {
      title,
      description,
      date,
      price
    };
    createEvent(event, token).then(res => {
      this.setState(prevState => {
        const newEvent = res.data.data.createEvent;
        if (!newEvent) {
          return {
            isCreating: true,
            error: true
          }
        }
        // Appending the new event
        return {
          events: [...prevState.events, res.data.data.createEvent],
          error: false
        };
      });
    })
      .catch(err => {
        console.log(err);
      });
  };
  showEventDetailsHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
  };
  bookEventHandler = async (eventId) => {
    if (!this.context.token) {
      console.log('cant');
      return;
    }
    let id;
    this.state.selectedEvent._id ? id = this.state.selectedEvent._id : id = eventId;
    try {
      await bookEvent(id);
      this.setState({selectedEvent: ''});
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <>
        {this.state.isCreating &&
          <CreateEventModal
            onCancel={this.closeModalHandler}
            onConfirm={this.confirmCreateEventHandler}
            error={this.state.error}
          />}
        {this.state.selectedEvent &&
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            onCancel={this.closeModalHandler}
            canBook
            onBook={this.bookEventHandler}
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>{new Date(this.state.selectedEvent.date).toLocaleDateString()}</h2>
            <h2>${this.state.selectedEvent.price}</h2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>}
        {this.context.token &&
          <>
            <div className="events__control">
              <button onClick={this.openCreateEventHandler}>Create Event</button>
              <button>My Events</button>
            </div>
            {/* THIS DOES NOTHING YET */}
            <div className="events__sort">
              <select name="sort" id="sort">
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </>}
        {this.state.isLoading
          ? <Spinner />
          : < EventList
            events={this.state.events}
            onDetails={this.showEventDetailsHandler}
            onBook={this.bookEventHandler}
            authUserId={this.context.userId}
          />
        }
        {this.state.error &&
          <div className="error__message">
            <p>Could not load events.</p>
            <button className="error__btn" onClick={this.fetchEvents}>Retry</button>
          </div>
        }
      </>
    );
  }
}

export default EventsPage;