import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.mock('../../services/AuthenticationService');

import LoginHeader from './LoginHeader';

describe("LoginHeader", () => {
  it("renders", () => {
    shallow(<LoginHeader />);
  });
});
