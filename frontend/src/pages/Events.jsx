import React, { Component } from 'react';
import './Events.css';
import Modal from '../components/Modal/Modal';

class EventsPage extends Component {
  state = {
    isCreating: false
  };

  openCreateEventHandler = () => {
    this.setState({ isCreating: true });
  };
  closeCreateEventHandler = () => {
    this.setState({ isCreating: false });
  }
  confirmCreateEventHandler = () => {
    this.setState({ isCreating: false });
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
            <p>Some text</p>
          </Modal>
          : null}
        <div className="events-control">
          <button onClick={this.openCreateEventHandler}>Create Event</button>
          <button>My Events</button>
        </div>
        <div className="events-wrapper">
        </div>
      </>
    );
  }
}

export default EventsPage;