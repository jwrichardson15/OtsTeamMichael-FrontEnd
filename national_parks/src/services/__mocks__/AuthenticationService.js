import { BehaviorSubject } from 'rxjs';

const user = {'username': 'test'};
const token = 'asdf.asdf.asdf';

const tokenSubject = new BehaviorSubject(localStorage.getItem('token'));
const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
  login,
  currentToken: tokenSubject.asObservable(),
  currentUser: userSubject.asObservable(),
  get token() { return tokenSubject.value },
  get user() { return userSubject.value }
};

function login(username, password) {
  if (username != 'fail') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    tokenSubject.next(token);
    userSubject.next(user);
  }
  return new Promise(function(resolve, reject) {
    process.nextTick(() =>
                     username != "fail"
                     ? resolve({'success': true})
                     : reject({
                       error: 'Failed to create ticket'
                     }),
                    );
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  tokenSubject.next(null);
  userSubject.next(null);
}
