import React, { Component } from 'react';
import Modal from './Modal';

class CreateEventModal extends Component {
  state = {
    title: '',
    description: '',
    price: 0,
    date: ''
  };
  constructor(props) {
    super(props);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { title, description, price, date } = this.state;
    return (
      <Modal title="Create Event"
        canCancel
        canConfirm
        onCancel={this.props.onCancel}
        onConfirm={this.props.onConfirm.bind(this, this.state)}
      >
        <>
        {this.props.error && <h3 className="error__block">Could not create event. Please try again!</h3>}
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" value={title} onChange={this.handleChange} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" id="price" value={price} onChange={this.handleChange} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" name="date" id="date" value={date} onChange={this.handleChange} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" rows="4" value={description} onChange={this.handleChange}></textarea>
            </div>
          </form >
        </>
      </Modal>
    );
  }
}

export default CreateEventModal;