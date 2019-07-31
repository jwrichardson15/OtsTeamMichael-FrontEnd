import React, {useState, useEffect} from 'react';
import { getEmployeeTickets } from '../api/employeeTicketApi';
import cellEditFactory from 'react-bootstrap-table2-editor';
import MyTicketsTable from './MyTicketsTable';
import {Form, Button} from 'react-bootstrap/Button';
// import BootstrapTable from 'react-bootstrap-table-next';
import ReactTable from 'react-table';
const MyTickets = () => {
  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeTickets, setEditEmployeeTickets] = useState([]);
  // const [tableColumns, setTableColumns] = useState([]);
  useEffect(() => {
    console.log("here");
    getEmployeeTickets("stGar2332")
      .then(result => {
        console.log(result);
        setEmployeeTickets(result);
        console.log(employeeTickets)
      });
  }, []);

  const tableColumns = [
    {
      accessor: 'id',
      Header: 'ID',
      
    }, 
    {
      accessor: 'categoryName',
      Header: 'Category'
    },  
    {
      accessor: 'status',
      Header: 'Status'
    },
    {
      accessor: 'description',
      Header: 'Description'
    },
    {
      accessor: 'email',
      Header: 'Client Email'
    },
    {
      accessor: 'employeeNotes',
      Header: 'Notes'
    },
    {
      Header: '',
      Cell: row => (
        <div>
            <Button onClick={() => handleEdit(row)}>Edit</Button>
            <Button onClick={() => handleSave(row)}>Save</Button>
        </div>
      )
   }
  ];

  const handleSave = (row) => {
    setEditMode(!editMode);
  }

  const handleEdit = (row) => {
      console.log(row);
      var tickets = [...employeeTickets];
      Object.keys(tickets[row.index]).map((key, index) => (
        tickets[row.index]["categoryName"] = 
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Example select</Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form>
      ))
      setEmployeeTickets(tickets);
      console.log(employeeTickets);
      setEditMode(!editMode);
  }

  return (
    <div>
      <ReactTable data={employeeTickets} columns={tableColumns}/>
    </div>

  );
};

// Object.keys(vals).map((key, index) => ( 
//   <p key={index}> this is my key {key} and this is my value {vals[key]}</p> 
// ))

export default MyTickets;



  