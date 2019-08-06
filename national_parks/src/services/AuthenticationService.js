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

// Actually set the values in me, so they all are set together
function me(token) {
  return axios.get('/api/employee/me',
                   {headers: {
                     'Authorization': 'Bearer ' + token,
                   }})
    .then(response => {return response.data})
    .then((user) => {
      localStorage.setItem('token', token);
      tokenSubject.next(token);
      localStorage.setItem('user', JSON.stringify(user));
      tokenSubject.next(user);
    });
}

// Need to handle failures here
function login(username, password) {
  const data = new FormData();

  data.append('username', username);
  data.append('password', password);

  return axios.post('/api/authenticate', data)
    .then(grabToken)
    .then((token) => {
      me(token);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  tokenSubject.next(null);
  userSubject.next(null);
}

function grabToken (response) {
  let token = response.headers.authorization.split(" ")[1];
  return token;
}
