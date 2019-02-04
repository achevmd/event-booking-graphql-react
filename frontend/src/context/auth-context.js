import React from 'react';


export default React.createContext({
  token: '',
  userId: '',
  email: '',
  login: (token) => {

  },
  logout: () => {

  }
});