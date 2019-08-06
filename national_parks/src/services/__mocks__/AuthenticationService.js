import { BehaviorSubject } from 'rxjs';

const user = {'username': 'testUser'};
const token = 'asdf.asdf.asdf';

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

function login(username, password) {
  if (username != 'fail') {
    const userSet = { ...user, 'username': username };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userSet));
    tokenSubject.next(token);
    userSubject.next(userSet);
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
