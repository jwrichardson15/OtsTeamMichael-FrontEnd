import React, {useState, useEffect} from 'react';
import { getParkTickets } from '../api/employeeTicketApi';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import ReactTable from 'react-table';
import { updateTicket } from '../api/ticketApi';


const AllTickets = () => {
  const [parkTickets, setParkTickets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editParkTickets, setEditParkTickets] = useState([]);

  useEffect(() => {
    console.log("here");
    getParkTickets(3)
      .then(result => {
        setParkTickets(result);
        setEditParkTickets([]);
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
        <div>
            <Button onClick={() => handleEdit(row)}>Edit</Button>
            <Button onClick={() => handleSave(row)}>Save</Button>
        </div>
      ),
      width: 200
   }
  ];
  const handleChange = (rowIndex, employeeUsername) => event => {
    parkTickets[rowIndex][employeeUsername] = event.target.value;
    setParkTickets(parkTickets);
  }

  const handleSave = (row) => {
    updateTicket(parkTickets[row.index]["id"], parkTickets[row.index]).then(response => {
      console.log("update ticket response", response);
    });
    setEditMode(!editMode);
  }

  const handleEdit = (row) => {

    let editParkTickets = JSON.parse(JSON.stringify(parkTickets));

    editParkTickets[row.index]["categoryName"] = (
          <Form>
              <Form.Control defaultValue={parkTickets[row.index]["employeeUsername"]} as="textarea" placeholder="Employee Username" onChange={handleChange(row.index, 'employeeUsername')}/>
          </Form>
      );
      setEditParkTickets(editParkTickets);
      setEditMode(!editMode);
  }

  return (
    <div>
      <ReactTable data={parkTickets} columns={tableColumns}/>
    </div>

  );
};

// Object.keys(vals).map((key, index) => ( 
//   <p key={index}> this is my key {key} and this is my value {vals[key]}</p> 
// ))

export default AllTickets;