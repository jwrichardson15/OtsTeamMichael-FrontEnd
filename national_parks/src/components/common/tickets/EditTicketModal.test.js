import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

jest.mock('../../../api/categoryApi');
jest.mock('../../../api/statusApi');

import EditTicketModal from './EditTicketModal';

describe("EditTicketModal", () => {
  it("renders", async () => {

    const testTicket = {'id': 1};
    const testUser = {'username': 'testUser'};

    await act(async () => {
      await mount(<EditTicketModal currentTicket={testTicket} user={testUser} />);
    });
  });

  it("renders unassign button", async () => {

    const testTicket = {'id': 1, 'employeeUsername': 'testUser'};
    const testUser = {'username': 'testUser'};
    var assigned;

    const assign = (newAssigned) => {
      assigned = newAssigned;
    }
    
    var wrapper;
    
    await act(async () => {
      wrapper = await mount(<EditTicketModal currentTicket={testTicket} user={testUser} show={true} assignment={assign}/>);
    });
    wrapper.find("#assignButton").last().simulate("click");
    wrapper.find("#assignButton").last().simulate("click");
    expect(assigned).toBe(false);
  });
  
  it("handles assign button", async () => {

    const testTicket = {'id': 1, 'employeeUsername': 'testUser'};
    const testUser = {'username': 'testUser2'};
    var assigned;

    const assign = (newAssigned) => {
      assigned = newAssigned;
    }

    var wrapper;
    
    await act(async () => {
      wrapper = await mount(<EditTicketModal currentTicket={testTicket} user={testUser} show={true} assignment={assign}/>);
    });
    wrapper.find("#assignButton").last().simulate("click");
    expect(assigned).toBe(true);
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
