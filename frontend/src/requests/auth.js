import axios from 'axios';

export const login = (email, password) => {
  const reqBody = {
    query: `
      query {
        login(email: "${email}", password: "${password}") {
          token
        }
      }
    `
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};
export const createUser = (email, password) => {
  const reqBody = {
    query: `
      mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}) {
          _id
          email
        }
      }
    `
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};