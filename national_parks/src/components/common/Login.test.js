import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Login from './Login';

describe("Login", () => {
  it("renders", () => {
    shallow(<Login />)
  });
});
