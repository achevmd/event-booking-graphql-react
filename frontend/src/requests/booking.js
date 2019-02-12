import axios from 'axios';

export const bookEvent = id => {
  const reqBody = {
    query: `
      mutation {
        bookEvent(eventId: "${id}") {
          _id
          createdAt
          updatedAt
        }
      }
    `
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};
export const deleteBooking = id => {
  const reqBody = {
    query: `
      mutation {
        cancelBooking(bookingId: "${id}") {
          _id
          title
          description
        }
      }
    `
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