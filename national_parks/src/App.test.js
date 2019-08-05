import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

jest.mock('./api/categoryApi');
jest.mock('./api/parkApi');

import App from './App';

describe("Login", () => {
  it("renders", async () => {
    await act(async () => {
      await mount(<App />);
    });
  });
});
