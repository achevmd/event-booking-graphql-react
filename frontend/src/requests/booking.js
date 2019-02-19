import axios from 'axios';

export const bookEvent = id => {
  const reqBody = {
    query: `
      mutation BookEvent($id: ID!) {
        bookEvent(eventId: $id) {
          _id
          createdAt
          updatedAt
        }
      }
    `,
    variables: { id }
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};
export const deleteBooking = id => {
  const reqBody = {
    query: `
      mutation CancelBooking($id: ID!) {
        cancelBooking(bookingId: $id) {
          _id
          title
          description
        }
      }
    `,
    variables: { id }
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};
export const bookings = () => {
  const reqBody = {
    query: `
      query {
        bookings {
          _id
          event {
            _id
            title
            date
            price
          }
          user {
            email
          }
          createdAt
          updatedAt
        }
      }
      `
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};