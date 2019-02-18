import axios from 'axios';

export const login = (email, password) => {
  const reqBody = {
    query: `
      query LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: { email, password }
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};
export const createUser = (email, password) => {
  const reqBody = {
    query: `
      mutation CreateUser($email: String!, $password: String!) {
        createUser(userInput: {email: $email, password: $password}) {
          _id
          email
        }
      }
    `,
    variables: { email, password }
  };
  return axios.post('http://localhost:8000/graphql', reqBody);
};