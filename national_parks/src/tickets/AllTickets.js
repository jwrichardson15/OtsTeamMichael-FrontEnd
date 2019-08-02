import React, {useState, useEffect} from 'react';
import { getParkTickets } from '../api/employeeTicketApi';
import { getCategories } from '../api/categoryApi';
import { getStatuses } from '../api/statusApi';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ReactTable from 'react-table';
import { updateTicket } from '../api/ticketApi';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {authenticationService} from '../services/AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faSave } from '@fortawesome/free-solid-svg-icons';

const AllTickets = () => {
  const [parkTickets, setParkTickets] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editParkTickets, setEditParkTickets] = useState([]);
  const [updatingTickets, setUpdatingTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        var tickets = {...value};
        setUser(tickets);
        getParkTickets(value["parkId"])
          .then(result => {
            result.forEach( row => {
              row['editMode'] = false;
            })
            setParkTickets(result);
            setUpdatingTickets(JSON.parse(JSON.stringify(result)));
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
      width: 50
      
    },
    {
      accessor: 'status',
      Header: 'Status',
      width: 100,
      style: { 'whiteSpace': 'unset' }
    },
    {
      accessor: 'categoryName',
      Header: 'Category',
      width: 200,
      style: { 'whiteSpace': 'unset' }
    }, 
    {
      accessor: 'description',
      Header: 'Description',
      style: { 'whiteSpace': 'unset' }
    },
    {
      accessor: 'employeeNotes',
      Header: 'Notes',
      style: { 'whiteSpace': 'unset' }
    },
    {
      accessor: 'dateCreated',
      Header: 'Date Created'
      // Cell: props => <span className='number'>{props.value.toLocale}</span>
    },
    {
      accessor: 'employeeUsername',
      Header: 'Assigned To:',
      width: 150
    },
    {
      Header: 'Edit Task',
      Cell: row => (
        <ButtonToolbar>
          { !editMode 
          ? 
            <Button size="sm" onClick={() => _handleEdit(row)}><FontAwesomeIcon icon={faEdit}/></Button> 
          : <>
            <Button size="sm" onClick={() => _handleSave(row)}><FontAwesomeIcon icon={faSave}/></Button>
            <Button size="sm" onClick={() => _handleCancle(row)}><FontAwesomeIcon icon={faBan}/></Button> </>}
        
          
        </ButtonToolbar>
      ),
      width: 100
   },
   {
     Header: '',
     Cell: row => (
       <ButtonToolbar>
         {
            parkTickets[row.index]["employeeUsername"] === user["username"] 
            ? 
              <Button variant="danger" onClick={() => _handleUnassign(row)} size="sm">Unassign</Button> 
            
          :
            <Button variant="success" onClick={() => _handleAssign(row)} size="sm">Assign</Button>}
        </ButtonToolbar>
     ),
     width: 100
   }
  ];

  const _handleChange = (rowIndex, category) => event => {
    updatingTickets[rowIndex][category] = event.target.value;
    setUpdatingTickets(updatingTickets);
  }

  const _handleDropdown = (rowIndex, categoryId, categoryName) => event => {
    const selectedIndex = event.target.options.selectedIndex;
    updatingTickets[rowIndex][categoryId] = event.target.options[selectedIndex].getAttribute('data-id');
    updatingTickets[rowIndex][categoryName] = event.target.value;
    setUpdatingTickets(updatingTickets);
  }

  const _handleEdit = (row) => {
    let editParkTickets = JSON.parse(JSON.stringify(parkTickets));
      var index = row.index;
      editParkTickets[index]["categoryName"] = (
        <Form>
          <Form.Group controlId="categorySelect" >
            <Form.Control 
              as="select" 
              onChange={_handleDropdown(index, "categoryId", "categoryName")} 
              defaultValue={parkTickets[index]["categoryName"]} 
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

      editParkTickets[index]["status"] = (
        <Form>
          <Form.Group controlId="statusSelect">
            <Form.Control 
              as="select" 
              onChange={_handleDropdown(index, "statusId", "status")}
              defaultValue={parkTickets[index]["status"]}>
              {
                statuses.map((value) => {
                  return(<option key={value["id"] }data-id={value["id"]}>{value["name"]}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form>
      );

      editParkTickets[index]["description"] = (
        <Form>
          <Form.Control 
            onChange={_handleChange(row.index, "description")}
            defaultValue={parkTickets[row.index]["description"]} 
          />
        </Form> 
      );  

      editParkTickets[index]["employeeNotes"] = (
        <Form>
          <Form.Control 
            as="textarea" rows="3" 
            onChange={_handleChange(index, "employeeNotes")}
            defaultValue={parkTickets[index]["employeeNotes"]} 
          />
        </Form> 
      );
      
      setEditParkTickets(editParkTickets);
      setEditMode(true);
      parkTickets[index]["editMode"] = true;
      setParkTickets(parkTickets);
      updatingTickets[index]["editMode"] = true;
      setUpdatingTickets(updatingTickets);
  }

  const _handleSave = (row) => {
    updateTicket(updatingTickets[row.index]["id"], updatingTickets[row.index]).then(response => {
      console.log("update ticket response", response);
    })
    updatingTickets[row.index]["editMode"] = false;
    console.log(updatingTickets);
    setParkTickets(JSON.parse(JSON.stringify(updatingTickets)));
    setEditMode(false);
  }


  const _handleCancle = (row) => {
    updatingTickets[row.index]["editMode"] = false;
    parkTickets[row.index]["editMode"] = false;
    setParkTickets([...parkTickets]);
    setUpdatingTickets(updatingTickets);
    setEditMode(false);
  }

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
      <ReactTable data={!editMode ? parkTickets : editParkTickets} columns={tableColumns} filterable={true}/>
    </div>

  );
}

export default AllTickets;