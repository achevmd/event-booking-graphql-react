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
export const createEvent = event => {
  const { title, description, price, date } = event;
  console.log(event);
  const reqBody = {
    query: `
      mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
        createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
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
    `,
    variables: { title, description, price, date }
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};