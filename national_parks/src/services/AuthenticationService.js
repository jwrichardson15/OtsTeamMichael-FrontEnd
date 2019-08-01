import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const tokenSubject = new BehaviorSubject(localStorage.getItem('token'));

export const authenticationService = {
  login,
  logout,
  currentToken: tokenSubject.asObservable(),
  get token() { return tokenSubject.value }
};

// Need to handle failures here
function login(username, password) {
  return axios.post('/auth/login', {"username": username, "password": password})
    .then(handleResponse)
    .then(response => {
      localStorage.setItem('token', response.token);
      tokenSubject.next(response.token);
      return response.token;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    tokenSubject.next(null);
}

function handleResponse(response) {
  return response.data;
}
