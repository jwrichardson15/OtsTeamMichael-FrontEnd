import React, {useState, useEffect} from 'react';
import { getParkTickets } from '../api/employeeTicketApi';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import ReactTable from 'react-table';
import { updateTicket } from '../api/ticketApi';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {authenticationService} from '../services/AuthenticationService';

const AllTickets = () => {
  const [parkTickets, setParkTickets] = useState([]);
  const [editParkTickets, setEditParkTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      console.log(value);
      if (value != null) {
        console.log(value);
        setUser(value);
      }
    });
    getParkTickets(3)
      .then(result => {
        result.forEach( row => {
          row['editMode'] = false;
        });
        setParkTickets(result);
        setEditingTicket(JSON.parse(JSON.stringify(result)));
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
        parkTickets[row.index]["editMode"] ? 
          <ButtonToolbar>
              <Button variant="success" onClick={() => handleSave(row)} size="sm">Save </Button>
              <Button variant="danger" onClick={() => handleCancel(row)} size="sm">Cancel</Button>
          </ButtonToolbar>
        :
          <ButtonToolbar>
            <Button variant="primary" onClick={() => handleEdit(row)} disabled={editMode} size="sm">Edit</Button>
          </ButtonToolbar>
      ),
      width: 200
   }
  ];

  const handleChange = (rowIndex, employeeUsername) => event => {
    editingTicket[rowIndex][employeeUsername] = event.target.value;
    setEditingTicket(editingTicket);
  };

  const handleSave = (row) => {
    updateTicket(parkTickets[row.index]["id"], parkTickets[row.index]).then(response => {
      console.log("update ticket response", response);
    });
    editingTicket[row.index]["editMode"] = false;
    setParkTickets(JSON.parse(JSON.stringify(editingTicket)));
    setEditMode(false);
  }
  
  const handleCancel = (row) => {
    editingTicket[row.index]["editMode"] = false;
    parkTickets[row.index]["editMode"] = false;
    setParkTickets([...parkTickets]);
    setEditingTicket(editingTicket);
    setEditMode(false);
  }

    const handleEdit = (row) => {
      var index = row.index;
      let editParkTickets = JSON.parse(JSON.stringify(parkTickets));

      editParkTickets[index]["employeeUsername"] = (
            <Form>
                <Form.Control defaultValue={parkTickets[index]["employeeUsername"]} 
                              as="textarea" 
                              placeholder="Employee Username" 
                              defaultValue={parkTickets[index]["employeeNotes"]}
                              onChange={handleChange(row.index, 'employeeUsername')}/>
            </Form>
        );
        setEditParkTickets(editParkTickets);
        setEditMode(true);
        parkTickets[index]["editMode"] = true;
        setParkTickets(parkTickets);
        editingTicket[index]["editMode"] = true;
        setEditingTicket(editingTicket);
    }


  return (
    <div>
      <ReactTable data={!editMode ? parkTickets : editParkTickets} columns={tableColumns}/>
    </div>

  );
}

export default AllTickets;