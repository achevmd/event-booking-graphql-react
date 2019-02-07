import React from 'react';
import EventItem from './EventItem/EventItem';
import './EventList.css';

const EventList = props => (
  <ul className="event__list">
    {props.events.map(event => {
      return (
        <EventItem
          key={event._id}
          event={event}
          authUserId={props.authUserId}
          onDetails={props.onDetails}
          onBook={props.onBook}
        />
      );
    })}
  </ul>
);

export default EventList;