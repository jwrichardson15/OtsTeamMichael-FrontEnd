import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

jest.mock('../../../api/categoryApi');
jest.mock('../../../api/parkApi');
jest.mock('../../../api/ticketApi');

import CreateTicket from './CreateTicket';

describe("CreateTickets", () => {
  it("renders", async () => {
    await act(async () => {
      await mount(<CreateTicket />);
    });
  });

  it("category populates", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<CreateTicket />);
    });
    wrapper.update();
    expect(wrapper.find('#formCreateTicketCategory').children().length).toEqual(4);
  });

  it("parks populates", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<CreateTicket />);
    });
    wrapper.update();
    expect(wrapper.find('#formCreateTicketPark').children().length).toEqual(4);
  });

  it("create ticket requires category and park", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<CreateTicket />);
    });
    wrapper.find("Form").last().simulate("submit");
    wrapper.update();
    expect(wrapper.find("StatusAlert").prop("status")).toEqual("warning");
  });

  it("create ticket success", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<CreateTicket />);
    });
    wrapper.find("#formCreateTicketPark").simulate('change', {target: {value: '1'}});
    wrapper.find("#formCreateTicketCategory").simulate('change', {target: {value: '1'}});
    await act(async () => {
      await wrapper.find("Form").last().simulate("submit");
    });
    wrapper.update();
    expect(wrapper.find("StatusAlert").prop("status")).toEqual("success");
  });

  it("create ticket failure", async () => {
    var wrapper;
    await act(async () => {
      wrapper = await mount(<CreateTicket />);
    });
    wrapper.find("#formCreateTicketPark").simulate('change', {target: {value: '1'}});
    wrapper.find("#formCreateTicketCategory").simulate('change', {target: {value: '1'}});
    wrapper.find("#formCreateTicketDescription").simulate('change', {target: {value: 'fail'}});
    await act(async () => {
      await wrapper.find("Form").last().simulate("submit");
    });
    wrapper.update();
    expect(wrapper.find("StatusAlert").prop("status")).toEqual("danger");
  });

});
