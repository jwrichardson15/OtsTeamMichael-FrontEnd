import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import TicketsTable from './TicketsTable.js';


jest.mock('../api/employeeTicketApi');



describe("TicketsTable", () => {
    it("renders all-tickets table", async () => {
      await act(async () => {
        await mount(<TicketsTable type="park"/>);
      });
    });

    it("renders my-tickets table", async () => {
        var wrapper;
        await act(async () => {
          wrapper = await mount(<TicketsTable type="employee"/>);
        });
        console.log(wrapper.debug());
        // expect(wrapper.find('#spinner').last().toMatchSnapshot());
      });
    
    it("renders loading spinner", async () => {
        await act(async () => {
          await mount(<Spinner/>);
        });
      });

      it("handles Unassign button", async () => {

        var assigned;
    
        const assign = (newAssigned) => {
          assigned = newAssigned;
        }
    
        var wrapper;
        
        await act(async () => {
          wrapper = await mount(<TicketsTable/>);
        });
        wrapper.find("#UnassignButton").last().simulate("click");
        expect(assigned).toBe(true);
      });

});