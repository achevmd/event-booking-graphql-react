import axios from 'axios';

export const bookEvent = (eventId) => {
  const reqBody = {
    query: `
      mutation {
        bookEvent(eventId: "${eventId}") {
          _id
          createdAt
          updatedAt
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