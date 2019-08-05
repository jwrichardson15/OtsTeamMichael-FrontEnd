import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

jest.mock('../../services/AuthenticationService');

import Login from './Login';

describe("Login", () => {
  it("renders", () => {
    mount(<Login />);
  });

  it("login failed", async () => {
    let wrapper = mount(<Login />);
    wrapper.find("#formLoginUsername").simulate('change', {target: {value: 'fail'}});
    await act(async () => {
      await wrapper.find("Form").last().simulate("submit");
    });
    wrapper.update();
    expect(wrapper.find("LoginStatus").prop("status")).toEqual("error");
  });

  it("login success", async () => {
    let wrapper = mount(<Login />);
    await act(async () => {
      await wrapper.find("Form").last().simulate("submit");
    });
    wrapper.update();
    expect(wrapper.find("LoginStatus").prop("status")).toEqual("success");
  });
});
