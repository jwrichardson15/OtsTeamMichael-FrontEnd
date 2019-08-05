import React, {useState, useEffect} from 'react';
import { getEmployeeTickets } from '../api/employeeTicketApi';
import { updateTicket } from '../api/ticketApi';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ReactTable from 'react-table';
import {authenticationService} from '../services/AuthenticationService';
import EditTicketModal from './EditTicketModal';

const MyTickets = () => {
  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        var userValue = {...value};
        setUser(userValue);
        getEmployeeTickets(value["username"])
          .then(result => {
            setEmployeeTickets(result);
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
            <Button variant="danger" onClick={() => _handleAssignment(false, row.index)} size="sm">Unassign</Button>
        </ButtonToolbar>
      )
   }
  ];

  const _handleAssignment = (assign, index) => {
    var rowIndex = currentIndex;
    if (index) {
      rowIndex = index;
    }
    var assignTicket = {...employeeTickets[rowIndex]};
    assignTicket["employeeUsername"] = assign ? user["username"] : null;
    updateTicket(employeeTickets[rowIndex]["id"], assignTicket).then(response => {
      const updatedTickets = JSON.parse(JSON.stringify(employeeTickets));
      updatedTickets.splice(rowIndex, 1)
      setEmployeeTickets(updatedTickets);
    });
  }

  const _handleSave = (ticket) => {
    updateTicket(ticket["id"], ticket);
    let newEmployeeTicket = JSON.parse(JSON.stringify(employeeTickets));
    newEmployeeTicket[currentIndex] = ticket;
    setEmployeeTickets(newEmployeeTicket);
  }

  const _handleCancel = (ticket) => {
    let newEmployeeTicket = JSON.parse(JSON.stringify(employeeTickets));
    newEmployeeTicket[currentIndex] = ticket;
    setEmployeeTickets(newEmployeeTicket);
    return newEmployeeTicket[currentIndex];
  }

  const _viewModal = (row) => {
    setViewModal(true);
    setCurrentIndex(row.index);
    setCurrentTicket(employeeTickets[row.index]);
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
      <h3 className='createHeader'>Username Tickets</h3>
      <ReactTable data={employeeTickets} columns={tableColumns} filterable={true}/>
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
}

export default MyTickets;