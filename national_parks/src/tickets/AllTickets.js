import React, {useState, useEffect} from 'react';
import { getParkTickets } from '../api/employeeTicketApi';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ReactTable from 'react-table';
import { updateTicket } from '../api/ticketApi';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {authenticationService} from '../services/AuthenticationService';

const AllTickets = () => {
  const [parkTickets, setParkTickets] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        var tickets = {...value};
        setUser(tickets);
        getParkTickets(value["parkId"])
          .then(result => {
            setParkTickets(result);
            setLoading(false);
          });
      }
      else {
        setLoading(true);
      }
    });
  }, []);

  const tableColumns = [
    {
      accessor: 'id',
      Header: 'ID',
      width: 100
      
    },
    {
      accessor: 'status',
      Header: 'Status',
      width: 200
    },
    {
      accessor: 'categoryName',
      Header: 'Category',
      width: 350
    }, 
    {
      accessor: 'dateCreated',
      Header: 'Date Created'
    },
    {
      accessor: 'employeeUsername',
      Header: 'Assigned To:'
    },
    {
      Header: 'Checkout Task',
      Cell: row => (
        parkTickets[row.index]["employeeUsername"] 
        ? 
          parkTickets[row.index]["employeeUsername"] === user["username"] 
          ? 
            <Button variant="danger" onClick={() => _handleUnassign(row)} size="sm">Unassign</Button> 
          : 
            <></> 
        :
          <ButtonToolbar>
            <Button variant="success" onClick={() => _handleAssign(row)} size="sm">Assign</Button>
          </ButtonToolbar>
      ),
      width: 200
   }
  ];

  const _handleUnassign = (row) => {
    var assignTicket = {...parkTickets[row.index]};
    assignTicket["employeeUsername"] = null;
    updateTicket(parkTickets[row.index]["id"], assignTicket).then(response => {
      const updatedTickets = JSON.parse(JSON.stringify(parkTickets));
      updatedTickets[row.index] = assignTicket;
      setParkTickets(updatedTickets);
    });
  }

  const _handleAssign = (row) => {
    var assignTicket = {...parkTickets[row.index]};
    assignTicket["employeeUsername"] = user["username"];
    updateTicket(parkTickets[row.index]["id"], assignTicket).then(response => {
      const updatedTickets = JSON.parse(JSON.stringify(parkTickets));
      updatedTickets[row.index] = assignTicket;
      setParkTickets(updatedTickets);
    });
  }

  return (
    loading 
    ? 

    <Spinner animation="border" role="status" variant="success" className="spinner">
      <span className="sr-only">Loading...</span>
    </Spinner>
    :
    <div>
      <h3 className='createHeader'>Park Tickets</h3>
      <ReactTable data={parkTickets} columns={tableColumns}/>
    </div>

  );
}

export default AllTickets;