import React, {useState, useEffect} from 'react';
import { getEmployeeTickets } from '../api/employeeTicketApi';
import { getCategories } from '../api/categoryApi';
import { getStatuses } from '../api/statusApi';
import { updateTicket } from '../api/ticketApi';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import ReactTable from 'react-table';
import {authenticationService} from '../services/AuthenticationService';

const MyTickets = () => {
  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [editingTicket, setEditingTickets] = useState([]);
  const [editEmployeeTickets, setEditEmployeeTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        var tickets = {...value};
        setUser(tickets);
        getEmployeeTickets(value["username"])
          .then(result => {
            result.forEach( row => {
              row['editMode'] = false;
            })
            setEmployeeTickets(result);
            setEditingTickets(JSON.parse(JSON.stringify(result)));
            setLoading(false);
          });
        
      }
      else {
        setLoading(true);
      }
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


  


  const tableColumns = [
    {
      accessor: 'id',
      Header: 'ID',
      width: 100
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
      width: 200,
      Cell: row => (
        employeeTickets[row.index]["editMode"] ? 
          <ButtonToolbar>
              <Button variant="success" onClick={() => _handleSave(row)} size="sm">Save </Button>
              <Button variant="danger" onClick={() => _handleCancle(row)} size="sm">Cancel</Button>
          </ButtonToolbar>
        :
          <ButtonToolbar>
            <Button variant="primary" onClick={() => _handleEdit(row)} disabled={editMode} size="sm">Edit</Button>
          </ButtonToolbar>
      )
    }  
  ];

  const _handleSave = (row) => {
    updateTicket(editingTicket[row.index]["id"], editingTicket[row.index]).then(response => {
      console.log("update ticket response", response);
    })
    editingTicket[row.index]["editMode"] = false;
    console.log(editingTicket);
    setEmployeeTickets(JSON.parse(JSON.stringify(editingTicket)));
    setEditMode(false);
  }

  const _handleCancle = (row) => {
    editingTicket[row.index]["editMode"] = false;
    employeeTickets[row.index]["editMode"] = false;
    setEmployeeTickets([...employeeTickets]);
    setEditingTickets(editingTicket);
    setEditMode(false);
  }

  const _handleChange = (rowIndex, category) => event => {
    // let editEmployeeTickets = JSON.parse(JSON.stringify(editingTicket));
    editingTicket[rowIndex][category] = event.target.value;
    setEditingTickets(editingTicket);
  }

  const _handleDropdown = (rowIndex, categoryId, categoryName) => event => {
    const selectedIndex = event.target.options.selectedIndex;
    editingTicket[rowIndex][categoryId] = event.target.options[selectedIndex].getAttribute('data-id');
    editingTicket[rowIndex][categoryName] = event.target.value;
    setEditingTickets(editingTicket);
  }

  const _handleEdit = (row) => {
      let editEmployeeTickets = JSON.parse(JSON.stringify(employeeTickets));
      var index = row.index;
      editEmployeeTickets[index]["categoryName"] = (
        <Form>
          <Form.Group controlId="categorySelect" >
            <Form.Control 
              as="select" 
              onChange={_handleDropdown(index, "categoryId", "categoryName")} 
              defaultValue={employeeTickets[index]["categoryName"]} 
            >
              {
                categories.map((value) => {
                  return(<option key={value["id"]} data-id={value["id"]}>{value["name"]}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form> 
      );

      editEmployeeTickets[index]["status"] = (
        <Form>
          <Form.Group controlId="statusSelect">
            <Form.Control 
              as="select" 
              onChange={_handleDropdown(index, "statusId", "status")}
              defaultValue={employeeTickets[index]["status"]}>
              {
                statuses.map((value) => {
                  return(<option key={value["id"] }data-id={value["id"]}>{value["name"]}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form>
      );

      editEmployeeTickets[index]["description"] = (
        <Form>
          <Form.Control 
            onChange={_handleChange(row.index, "description")}
            defaultValue={employeeTickets[row.index]["description"]} 
          />
        </Form> 
      );  

      editEmployeeTickets[index]["employeeNotes"] = (
        <Form>
          <Form.Control 
            as="textarea" rows="3" 
            onChange={_handleChange(index, "employeeNotes")}
            defaultValue={employeeTickets[index]["employeeNotes"]} 
          />
        </Form> 
      );
      
      setEditEmployeeTickets(editEmployeeTickets);
      setEditMode(true);
      employeeTickets[index]["editMode"] = true;
      setEmployeeTickets(employeeTickets);
      editingTicket[index]["editMode"] = true;
      setEditingTickets(editingTicket);

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
      <ReactTable data={!editMode ? employeeTickets : editEmployeeTickets} columns={tableColumns}/>
    </div>
    
  );
};

export default MyTickets;



  