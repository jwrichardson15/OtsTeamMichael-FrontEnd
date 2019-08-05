import React, {useEffect, useState} from 'react';

import { getParkTickets } from '../api/employeeTicketApi';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ReactTable from 'react-table';
import { updateTicket } from '../api/ticketApi';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {authenticationService} from '../services/AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import EditTicketModal from './EditTicketModal';


const AllTickets = () => {
  const [parkTickets, setParkTickets] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTicket, setCurrentTicket] = useState({});

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        var userValue = {...value};
        setUser(userValue);
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
      width: 50
    },
    {
      accessor: 'status',
      Header: 'Status',
      width: 150,
      style: { 'whiteSpace': 'unset' }
    },
    {
      accessor: 'categoryName',
      Header: 'Category',
      style: { 'whiteSpace': 'unset' },
    },
    {
      accessor: 'dateCreated',
      Header: 'Date Created'
      // Cell: props => <span className='number'>{props.value.toLocale}</span>
    },
    {
      accessor: 'employeeUsername',
      Header: 'Assigned To:',
    },
    {
      Header: 'Edit Task',
      Cell: row => (
        <ButtonToolbar>
            <Button size="sm" onClick={() => _viewModal(row)}><FontAwesomeIcon icon={faEye}/></Button> 
            {
            parkTickets[row.index]["employeeUsername"] === user["username"] 
            ? 
              <Button variant="danger" onClick={() => _handleAssignment(false, row.index)} size="sm">Unassign</Button> 
            
          :
            <Button variant="success" onClick={() => _handleAssignment(true, row.index)} size="sm">Assign</Button>}
        </ButtonToolbar>
      )
   }
  ];

  const _handleAssignment = (assign, index) => {
    var rowIndex = currentIndex;
    if (index) {
      rowIndex = index;
    }
    var assignTicket = {...parkTickets[rowIndex]};
    assignTicket["employeeUsername"] = assign ? user["username"] : null;
    updateTicket(parkTickets[rowIndex]["id"], assignTicket).then(response => {
      const updatedTickets = JSON.parse(JSON.stringify(parkTickets));
      updatedTickets[rowIndex] = assignTicket;
      setParkTickets(updatedTickets);
    });
  }

  const _handleSave = (ticket) => {
    updateTicket(ticket["id"], ticket);

    let newParkTicket = JSON.parse(JSON.stringify(parkTickets));
    newParkTicket[currentIndex] = ticket;
    setParkTickets(newParkTicket);
  }

  const _handleCancel = (ticket) => {
    let newParkTicket = JSON.parse(JSON.stringify(parkTickets));
    newParkTicket[currentIndex] = ticket;
    setParkTickets(newParkTicket);
    return newParkTicket[currentIndex];
  }

  const _viewModal = (row) => {
    setViewModal(true);
    setCurrentIndex(row.index);
    setCurrentTicket(parkTickets[row.index]);
  } 

  const _handleClose = () => {
    setViewModal(false);
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
      <ReactTable data={parkTickets} columns={tableColumns} filterable={true}/>
      <EditTicketModal 
        currentTicket={currentTicket} 
        show={viewModal} 
        hide={_handleClose} 
        onSave={_handleSave}
        onCancel={_handleCancel}
        user={user}
        assignment={_handleAssignment}
      />
      
    </div>
  );
};

export default AllTickets;