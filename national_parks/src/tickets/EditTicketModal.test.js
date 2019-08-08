import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

jest.mock('../api/categoryApi');
jest.mock('../api/statusApi');

import EditTicketModal from './EditTicketModal';

describe("EditTicketModal", () => {
  it("renders", async () => {

    const testTicket = {'id': 1};
    const testUser = {'username': 'testUser'};

    await act(async () => {
      await mount(<EditTicketModal currentTicket={testTicket} user={testUser} />);
    });
  });

  it("can close", async () => {

    const testTicket = {'id': 1, 'employeeUsername': 'testUser'};
    const testUser = {'username': 'testUser2'};

    var hidden = false;
    const hide = () => {
      hidden = true;
    }
    
    var wrapper;
    
    await act(async () => {
      wrapper = await mount(<EditTicketModal currentTicket={testTicket} user={testUser} show={true} hide={hide}/>);
    });
    wrapper.find(".modal-header").find('button').last().simulate('click');
    expect(hidden).toBe(true);
  });
});
