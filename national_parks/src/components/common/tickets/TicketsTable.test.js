import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

jest.mock('../../../api/categoryApi');
jest.mock('../../../api/statusApi');
jest.mock('../../../api/ticketApi');
jest.mock('../../../api/employeeApi');
jest.mock('../../../api/employeeTicketApi');
jest.mock('../../../services/AuthenticationService');

import { authenticationService } from '../../../services/AuthenticationService';
import TicketsTable from './TicketsTable';

describe("TicketsTable", () => {

  it("renders loading spinner", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<TicketsTable type="employee"/>);
    });
    expect(wrapper.find("Spinner").text()).toBe('Loading...');
  });

  it("renders all-tickets table", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<TicketsTable type="park"/>);
      authenticationService.login("username", "password");
    });
    wrapper.update();
    expect(wrapper.find("Tbody").find("TrGroupComponent").find("TdComponent").first().text()).toBe('1337');

    await act(async () => {
      authenticationService.logout();
    });
  });

  it("renders my-tickets table", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<TicketsTable type="employee"/>);
      authenticationService.login("username", "password");
    });
    wrapper.update();
    expect(wrapper.find("Tbody").find("TrGroupComponent").find("TdComponent").first().text()).toBe('1729');

    await act(async () => {
      authenticationService.logout();
    });

  });

  it("shows edit modal", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<TicketsTable type="employee"/>);
      authenticationService.login("username", "password");
    });
    wrapper.update();
    wrapper.find("#ticketTableViewButton").first().simulate('click');
    wrapper.update();
    expect(wrapper.find("EditTicketModal").prop("show")).toBe(true);

    await act(async () => {
      authenticationService.logout();
    });
  });

  it("unassigns tickets", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<TicketsTable type="employee"/>);
      authenticationService.login("testEmployee", "password");
    });
    wrapper.update()
    await act(async () => {
      wrapper.find("#ticketTableAssignButton").first().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find("Tbody").find("TrGroupComponent").first().text()).toEqual(expect.not.stringContaining("testEmployee"));

    await act(async () => {
      authenticationService.logout();
    });
  });

  it("assigns tickets", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<TicketsTable type="park"/>);
      authenticationService.login("testEmployee", "password");
    });
    wrapper.update()
    await act(async () => {
      wrapper.find("#ticketTableAssignButton").first().simulate('click');
    });
    wrapper.update();
    expect(wrapper.find("Tbody").find("TrGroupComponent").first().text()).toEqual(expect.stringContaining("testEmployee"));

    await act(async () => {
      authenticationService.logout();
    });
  });

});
