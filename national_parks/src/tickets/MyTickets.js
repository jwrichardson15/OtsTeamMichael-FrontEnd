import React, {useState, useEffect} from 'react';
import { getEmployeeTickets } from '../api/employeeTicketApi';
import { getCategories } from '../api/categoryApi';
import { getStatuses } from '../api/statusApi';
import { updateTicket } from '../api/ticketApi';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import ReactTable from 'react-table';

const MyTickets = () => {
  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [editingTicket, setEditingTickets] = useState([]);
  const [editEmployeeTickets, setEditEmployeeTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getEmployeeTickets("stGar2332")
      .then(result => {
        result.forEach( row => {
          row['editMode'] = false;
        })
        setEmployeeTickets(result);
        setEditingTickets(JSON.parse(JSON.stringify(result)));
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
    editingTicket[rowIndex][category] = event.target.value;
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
              onChange={_handleChange(index, "categoryName")} 
              defaultValue={employeeTickets[index]["categoryName"]} 
            >
              {
                categories.map((value) => {
                  return(<option key={value["id"]}>{value["name"]}</option>);
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
              onChange={_handleChange(index, "status")}
              defaultValue={employeeTickets[index]["status"]}>
              {
                statuses.map((value) => {
                  return(<option key={value["id"]}>{value["name"]}</option>);
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
    <div>
      <ReactTable data={!editMode ? employeeTickets : editEmployeeTickets} columns={tableColumns}/>
    </div>

  );
};

export default MyTickets;



  