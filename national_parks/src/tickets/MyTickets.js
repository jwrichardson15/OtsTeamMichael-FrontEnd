import React, {useState, useEffect} from 'react';
import { getEmployeeTickets } from '../api/employeeTicketApi';
import { getCategories } from '../api/categoryApi';
import { getStatuses } from '../api/statusApi';
import { updateTicket } from '../api/ticketApi';
import cellEditFactory from 'react-bootstrap-table2-editor';
import MyTicketsTable from './MyTicketsTable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import BootstrapTable from 'react-bootstrap-table-next';
import ReactTable from 'react-table';
const MyTickets = () => {
  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeTickets, setEditEmployeeTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  // const [tableColumns, setTableColumns] = useState([]);
  useEffect(() => {
    getEmployeeTickets("stGar2332")
      .then(result => {
        setEmployeeTickets(result);
        setEditEmployeeTickets([]);
      });
    getCategories()
      .then(result => {
        setCategories(result);
      });
    getStatuses()
      .then(result => {
        setStatuses(result);
      });
    
  }, []);

  useEffect(() => {
    console.log("second use effect in action");

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
    // console.log("saving", employeeTickets[row.index]["employeeNotes"]);
    updateTicket(employeeTickets[row.index]["id"], employeeTickets[row.index]).then(response => {
      console.log("update ticket response", response);
    })
    setEditMode(!editMode);
  }

  const _handleChange = (rowIndex, category) => event => {
    employeeTickets[rowIndex][category] = event.target.value;
    setEmployeeTickets(employeeTickets);
  }

  const handleEdit = (row) => {
    // JSON.parse(JSON.stringify(nodesArray))
      let editEmployeeTickets = JSON.parse(JSON.stringify(employeeTickets));

      editEmployeeTickets[row.index]["categoryName"] = (
        <Form>
          <Form.Group controlId="categorySelect">
            <Form.Control as="select" onChange={_handleChange(row.index, "categoryName")} >
              {
                categories.map((value, index) => {
                  return(<option key={index}>{value["name"]}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form> 
      );

      editEmployeeTickets[row.index]["status"] = (
        <Form>
          <Form.Group controlId="statusSelect">
            <Form.Control as="select" onChange={_handleChange(row.index, "status")}>
              {
                statuses.map((value, index) => {
                  return(<option key={index}>{value["name"]}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form>
      );

      editEmployeeTickets[row.index]["description"] = (
        <Form>
          <Form.Control defaultValue={employeeTickets[row.index]["description"]} onChange={_handleChange(row.index, "description")}/>
      </Form> 
      );  

      editEmployeeTickets[row.index]["employeeNotes"] = (
        <Form>
          <Form.Control as="textarea" rows="3" defaultValue={employeeTickets[row.index]["employeeNotes"]} onChange={_handleChange(row.index, "employeeNotes")}/>
      </Form> 
      );
      
      setEditEmployeeTickets(editEmployeeTickets);
      // console.log(editEmployeeTickets);
      console.log(editEmployeeTickets);
      setEditMode(!editMode);
  }

  return (
    <div>
      <ReactTable data={!editMode ? employeeTickets : editEmployeeTickets} columns={tableColumns}/>
    </div>

  );
};

// Object.keys(vals).map((key, index) => ( 
//   <p key={index}> this is my key {key} and this is my value {vals[key]}</p> 
// ))

export default MyTickets;



  