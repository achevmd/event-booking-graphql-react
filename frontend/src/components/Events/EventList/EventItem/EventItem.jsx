import React from 'react';
import './EventItem.css';

const EventItem = (props) => (
  <li key={props.event._id} className="event__list-item">
    <h1 className="event__list-item__title">{props.event.title}</h1>
    <div className="event__list-item__details">{new Date(props.event.date).toLocaleDateString()} - ${props.event.price}</div>
    <br />
    <div className="event__list-item__control">
      <button className="blue" onClick={props.onDetails.bind(this, props.event._id)}>View Details</button>
      {/* Checks if the logged in person created this event */}
      {props.event.creator._id === props.authUserId
        ? <p>You created this event!</p>
        : <>
          - or -
        <button className="gold" onClick={props.onBook.bind(this, props.event._id)}>Book</button>
        </>
      }
    </div>
  </li>
);


export default EventItem;