import axios from 'axios';

export const events = () => {
  const reqBody = {
    query: `
      query {
        events {
          _id
          title
          description
          price
          date
          creator {
            _id
            email
          }
        }
      }
    `
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};
export const createEvent = (event, token) => {
  const { title, description, price, date } = event;
  const reqBody = {
    query: `
      mutation {
        createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
          _id
          title
          description
          price
          date
          creator {
            _id
            email
          }
        }
      }
    `
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};