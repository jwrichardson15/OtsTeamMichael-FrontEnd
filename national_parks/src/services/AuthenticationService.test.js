import React from 'react';
import axios from 'axios';

jest.mock('axios');

import { authenticationService } from './AuthenticationService';

describe("LoginHeader", () => {
  it("token null by default", () => {
    expect(authenticationService.token).toEqual(null);
  });

  it("user null by default", () => {
    expect(authenticationService.user).toEqual(null);
  });

  it("logout clears localStorage", () => {
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('user', JSON.stringify({'username': 'testUser'}));
    authenticationService.logout();
    expect(localStorage.getItem('token')).toEqual(null);
    expect(localStorage.getItem('user')).toEqual(null);
  });

  it("login sets functions as expected", () => {
    const headers = {"authorization": "Bearer testToken"};
    const body = {"username": "testUser"};
    axios.post.mockImplementation(() => Promise.resolve({ "headers": headers, "data": body }));
    authenticationService.login("username", "password").then(() => {
      expect(authenticationService.token).toEqual("testToken");
    }).then(() => {
      expect(authenticationService.user).toEqual(body);
    });
  });
});
