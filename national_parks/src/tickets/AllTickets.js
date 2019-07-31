import React, {useState, useEffect} from 'react';
import { getParkTickets } from '../api/employeeTicketApi';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import ReactTable from 'react-table';


const AllTickets = () => {
  const [parkTickets, setParkTickets] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log("here");
    getParkTickets(3)
      .then(result => {
        console.log(result);
        setParkTickets(result);
        console.log(parkTickets)
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

  const handleSave = (row) => {
    setEditMode(!editMode);
  }

  const handleEdit = (row) => {
      console.log(row);
      var tickets = [...parkTickets];
      Object.keys(tickets[row.index]).map((key, index) => (
        tickets[row.index]["employeeUsername"] = 
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="textarea" placeholder="Employee Username">
              </Form.Control>
            </Form.Group>
          </Form>
      ))
      setParkTickets(tickets);
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