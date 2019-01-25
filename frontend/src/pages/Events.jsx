import React, { Component } from 'react';

import './Events.css';
import Modal from '../components/Modal/Modal';
import AuthContext from '../context/auth-context';
import { events, createEvent } from '../requests/events';


class EventsPage extends Component {
  state = {
    isCreating: false,
    events: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
  }
  componentDidMount() {
    this.fetchEvents();
  }
  fetchEvents = () => {
    events().then(res => {
      this.setState({ events: res.data.data.events });
    })
      .catch(err => {
        console.log(err);
      })
  }
  openCreateEventHandler = () => {
    this.setState({ isCreating: true });
  };
  closeCreateEventHandler = () => {
    this.setState({ isCreating: false });
  }
  confirmCreateEventHandler = () => {
    this.setState({ isCreating: false });
    const title = this.titleElRef.current.value;
    const description = this.descriptionElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    if (title.trim().length === 0 || description.trim().length === 0 ||
      price <= 0 || date.trim().length === 0) {
      return;
    }
    const event = {
      title,
      description,
      date,
      price
    };
    const token = this.context.token;
    createEvent(event, token).then(res => {
      this.fetchEvents();
    })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {this.state.isCreating
          ? <Modal title="Create Event"
            canCancel
            canConfirm
            onCancel={this.closeCreateEventHandler}
            onConfirm={this.confirmCreateEventHandler}
          >
            <form className="" onSubmit={this.submitHandler}>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" name="date" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows="4" ref={this.descriptionElRef}></textarea>
              </div>
            </form >
          </Modal>
          : null}
        {this.context.token && <div className="events__control">
          <button onClick={this.openCreateEventHandler}>Create Event</button>
          <button>My Events</button>
        </div>}
        <ul className="events__list">
          {this.state.events.map(event => {
            return (
              <li key={event._id} className="events__list-item">
                <p>title: {event.title}</p>
                <p>desc: {event.description}</p>
                <p>date: {event.date}</p>
                <p>price: {event.price}</p>
                <p>creator: {event.creator.email}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default EventsPage;