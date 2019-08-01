import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const tokenSubject = new BehaviorSubject(localStorage.getItem('token'));
const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
  login,
  logout,
  currentToken: tokenSubject.asObservable(),
  currentUser: userSubject.asObservable(),
  get token() { return tokenSubject.value },
  get user() { return userSubject.value }
};

// Need to handle failures here
function login(username, password) {
  return axios.post('/auth/login', {"username": username, "password": password})
    .then(handleResponse)
    .then(({token, user}) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      tokenSubject.next(token);
      userSubject.next(user);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  tokenSubject.next(null);
  userSubject.next(null);
}

// Probably could use some error handling here
function handleResponse(response) {
  let token = response.headers.authorization.split(" ")[1];
  let user = response.data;
  return {token, user};
}
