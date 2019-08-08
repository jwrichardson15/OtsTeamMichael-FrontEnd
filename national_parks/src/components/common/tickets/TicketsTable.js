import React, {useEffect, useState} from 'react';
import { getParkTickets } from '../../../api/employeeTicketApi';
import { getEmployeeTickets } from '../../../api/employeeTicketApi';
import { getCategories } from '../../../api/categoryApi';
import { getStatuses } from '../../../api/statusApi';
import { updateTicket } from '../../../api/ticketApi';
import { getEmployees } from '../../../api/employeeApi';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ReactTable from 'react-table';
import { authenticationService } from '../../../services/AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import EditTicketModal from './EditTicketModal';
import './EditTicketModal.css';
import Moment from 'react-moment';
import { getParks } from '../../../api/parkApi';

const TicketsTable = (props) => {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTicket, setCurrentTicket] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [changePage, setChangePage] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [employeeFilter, setEmployeeFilter] = useState(false);

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        var userValue = {...value};
        setUser(userValue);
        
        if (props.type === "park") {
          setChangePage(true);
          getParkTickets(value["parkId"])
          .then(result => {
            setTickets(result);
            setLoading(false);
            setChangePage(false);
            setEmployeeFilter(true);
          });
        }
        else if (props.type === "employee") {
          // setLoading(true);
          setChangePage(true);
          getEmployeeTickets(value["username"])
          .then(result => {
            setTickets(result);
            setLoading(false);
            setChangePage(false);
            setEmployeeFilter(false);

          });
        }
        
        getStatuses()
        .then(result => {
          setStatuses(result);
        });
        getCategories()
        .then(result => {
          setCategories(result);
        });
        getEmployees()
        .then(result => {
          setEmployees(result);
        });
      }
      else {
        setLoading(true);
        setChangePage(true);
      }
    });
  }, [props.type]);

  const tableColumns = [
    {
      accessor: 'id',
      Header: 'ID',
      width: 50,
      headerClassName: 'id-header'
    },
    {
      accessor: 'status',
      Header: 'Status',
      width: 150,
      style: { 'whiteSpace': 'unset' },
      headerClassName: 'status-header',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({filter, onChange}) => {
        if (changePage && filter) {
          filter.value = "all";
        }
        return (
          <select
            onChange={event => onChange(event.target.value)}
            style={{width: "100%"}}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            { statuses.map((value) => {
                return(<option value={value["name"]} key={value["id"]}>{value["name"]}</option>);
              } ) 
            }
          </select>
        );
      }
    },
    {
      accessor: 'categoryName',
      Header: 'Category',
      style: { 'whiteSpace': 'unset' },
      headerClassName: 'category-header',
      // width: 100,
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({filter, onChange}) => {
        if (changePage && filter) {
          filter.value = "all";
        }
        return(
          <select
            onChange={event => onChange(event.target.value)}
            style={{width: "100%"}}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            { categories.map((value) => {
                return(<option value={value["name"]} key={value["id"]}>{value["name"]}</option>);
              } ) 
            }
          </select>
        )
      }
    },
    {
      accessor: 'dateCreated',
      Header: 'Date Created',
      style: { 'whiteSpace': 'unset' },
      Cell: props => {return props.value ? <Moment format="MMM DD, YYYY hh:mma">{props["value"]}</Moment> : null},
      filterable: false,
      headerClassName: 'date-created'
    },
    {
      accessor: 'employeeUsername',
      Header: 'Assigned Employee',
      headerClassName: props.type === "park" ? 'park-employee-header' : 'employee-employee-header',
      className: props.type === "park" ? 'park-employee-cell' : 'employee-employee-cell',
      filterable: employeeFilter,
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({filter, onChange}) => {
        if (changePage && filter) {
          filter.value = "all";
        }
        return(
          <select
            onChange={event => onChange(event.target.value)}
            style={{width: "100%"}}
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            { employees.map((value, index) => {
                return(<option value={value["username"]} key={index}>{value["username"]}</option>);
              } ) 
            }
          </select>
        )
      }
    },
    {
      Header: 'View/Edit',
      width: 150,
      filterable: false,
      headerClassName: 'view-edit-header',
      Cell: row => (
        <ButtonToolbar>
            <Button size="sm" className="tableButton" id="ticketTableViewButton" onClick={() => _viewModal(row)}><FontAwesomeIcon icon={faEye}/></Button> 
            {
            tickets[row.index]["employeeUsername"] === user["username"] 
            ? 
              <Button variant="danger" className="tableButton" id="ticketTableAssignButton" onClick={() => _handleAssignment(false, row.index)} size="sm">Unassign</Button> 
            
          :
            <Button variant="success" className="tableButton" id="ticketTableAssignButton" onClick={() => _handleAssignment(true, row.index)} size="sm">Assign</Button>}
        </ButtonToolbar>
      )
   }
  ];

  const _handleAssignment = (assign, index) => {
    console.log(assign, index)
    var rowIndex = currentIndex;
    var assignTicket = {};
    if (index) {
      rowIndex = index;
      assignTicket = {...tickets[index]};
    }
    else {
      assignTicket = {...tickets[currentIndex]}
    }
    assignTicket["employeeUsername"] = assign ? user["username"] : null;
    updateTicket(tickets[rowIndex]["id"], assignTicket).then(response => {
      const updatedTickets = JSON.parse(JSON.stringify(tickets));
      updatedTickets[rowIndex] = assignTicket;
      if (props.type === "employee" && !assign) {
        updatedTickets.splice(rowIndex, 1);
        setTickets(updatedTickets);
        _handleClose();
      }
      setTickets(updatedTickets);
    });
  }

  const _handleSave = (ticket) => {
    updateTicket(ticket["id"], ticket).then(response => {
      let newParkTicket = JSON.parse(JSON.stringify(tickets));
      if (props.type === "park" || newParkTicket[currentIndex]["id"] === ticket["id"]) {
        newParkTicket[currentIndex] = ticket;
        setTickets(newParkTicket);
      }
    });
    
  }

  const _handleCancel = (ticket) => {
    let newParkTicket = JSON.parse(JSON.stringify(tickets));
    // if (props.type === "park" || newParkTicket[currentIndex]["id"] === ticket["id"]) {
    //   newParkTicket[currentIndex] = ticket;
    //   setTickets(newParkTicket);
    // }
    return newParkTicket[currentIndex];
  }

  const _viewModal = (row) => {
    setViewModal(true);
    setCurrentIndex(row.index);
    setCurrentTicket(tickets[row.index]);
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
      <h3 className='createHeader'>
        {props.type === "park" 
        ? 
          `${user["parkName"]} Park Tickets`
        :
          `${user["fname"]} ${user["lname"]}'s Tickets`
        }

      </h3>
      <ReactTable data={tickets} columns={tableColumns} filterable={true} defaultPageSize={10} className={props.type} />
h      <EditTicketModal 
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

export default TicketsTable;