import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Statistics from './Statistics.js';

describe("Statistics", () => {
  it("renders", () => {
    mount(<Statistics />);
  });
}); 