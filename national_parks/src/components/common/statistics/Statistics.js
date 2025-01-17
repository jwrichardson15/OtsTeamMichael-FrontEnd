import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {authenticationService} from '../../../services/AuthenticationService';
import { getCategories } from '../../../api/categoryApi';
import { getStatuses } from '../../../api/statusApi';
import { getParks } from '../../../api/parkApi';
import { getParkTickets } from '../../../api/employeeTicketApi';
import { getEmployees } from '../../../api/employeeApi';
import ReactTable from 'react-table';
import { Table, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import './Statistics.css';
import moment from 'moment';
import { bindCallback } from 'rxjs';


const Statistics = () => {
  const [selectedPark, setSelectedPark] = useState({});
  const [allParks, setAllParks] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [ticketStatusStats, setTicketStatusStats] = useState({});
  const [ticketCategoryStats, setTicketCategoryStatus] = useState({});
  const [chartData, setChartData] = useState({labels: [], datasets: {}});
  const [statusStats, setStatusStats] = useState({});
  const [categoryStats, setCategoryStats] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        setSelectedPark({
          "parkId": value["parkId"],
          "parkName": value["parkName"]
        });
      }
    });
    getParks().then(result => {
      setAllParks(result);
    });

    let status_ = {};
    let category_ = {};

    getStatuses().then(result => {
      result.forEach(status => {
        status_[status["name"]] = 0
      });
      setStatusStats({...status_});
    });

    getCategories().then(result => {
      result.forEach(category => {
        category_[category["name"]] = 0
      });
      setCategoryStats({...category_});
    });
    getEmployees()
    .then(result => {
      setEmployees(result);
    });
  }, []);

  useEffect(() => {
    getParkTickets().then(result => {
      let parkTickets = {};
      let parkStatusStats = {};
      let parkCategoryStats = {};
      result.forEach(ticket => {
        if(parkTickets[ticket["parkId"]]) {
          parkTickets[ticket["parkId"]].push(ticket);
        }
        else {
          parkTickets[ticket["parkId"]] = [ticket];
          parkStatusStats[ticket["parkId"]] = {
            ...statusStats
          };
          parkCategoryStats[ticket["parkId"]] = {
            ...categoryStats
          };
        }
        parkStatusStats[ticket["parkId"]] = {
          ...parkStatusStats[ticket["parkId"]],
          [ticket["status"]]: parkStatusStats[ticket["parkId"]][ticket["status"]] + 1
        };
        parkCategoryStats[ticket["parkId"]] = {
          ...parkCategoryStats[ticket["parkId"]],
          [ticket["categoryName"]]: parkCategoryStats[ticket["parkId"]][ticket["categoryName"]] + 1
        }
      });
      setTicketStatusStats({...parkStatusStats});
      setTicketCategoryStatus({...parkCategoryStats});
      setGroupedTickets({...parkTickets});
      
    });
  }, [statusStats, categoryStats])

  

  useEffect(() => {
    const result = _updateCategoryChartData();
    setChartData({
      ...result
    });
    
  }, [selectedPark, ticketCategoryStats]);

  const _updateCategoryChartData = () => {
    let labels = [];
    let dataset = [];
    if(ticketCategoryStats[selectedPark["parkId"]]) {
      Object.entries(ticketCategoryStats[selectedPark["parkId"]]).map(([key, value]) => {
        labels.push(key);
        dataset.push(value);
      });
    }
    return {
      labels: labels,
      datasets: [{
        data: dataset,
        backgroundColor: ["#6899BA", "#DDCCBA", "#CC7667", "#432233", "#D1E7EA", "#946579"]
       
      }]
    };
  };

  const _handleDropdown = () => event => {
    const selectedIndex = event.target.options.selectedIndex;
    setSelectedPark({
      "parkId": event.target.options[selectedIndex].getAttribute('data-id'),
      "parkName": event.target.value
    });
  }

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
      headerClassName: 'status-header',
      style: { 'whiteSpace': 'unset' },
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({filter, onChange}) => 
        
        <select
          onChange={event => onChange(event.target.value)}
          style={{width: "100%"}}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          {
            Object.keys(statusStats).map((key, index) => {
              return(<option value={key} key={index}>{key}</option>);
            })
          }
        </select>
    },
    {
      accessor: 'categoryName',
      Header: 'Category',
      style: { 'whiteSpace': 'unset' },
      headerClassName: 'category-header',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({filter, onChange}) => 
        <select
          onChange={event => onChange(event.target.value)}
          style={{width: "100%"}}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          { 
            Object.keys(categoryStats).map((key, index) => {
              return(<option value={key} key={index}>{key}</option>);
            })
          }
        </select>
    },
    {
      accessor: 'dateCreated',
      Header: 'Date Created',
      headerClassName: 'date-created',
      Cell: props => {return props.value ? moment(props.value).format("MMM DD, YYYY hh:mma") : null},
      filterable: false
    },
    {
      accessor: 'employeeUsername',
      Header: 'Assigned Employee',
      headerClassName: 'park-employee-header',
      className: 'park-employee-cell',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({filter, onChange}) => {
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
    }
  ];

  return (
    <span className="statistics-page">
    <h2>{selectedPark["parkName"]} Statistics</h2>
    <Container>
      <Row className="statisticRows">
        <Col md={6} style={{paddingLeft : "0px"}}>
          <Form.Label style={{fontSize:"140%"}}>Select a Park</Form.Label>
          <Form.Control
            as={"select"}
            value={selectedPark["parkName"]}
            onChange={_handleDropdown()}
            style={{"width": "50%"}}
          > 
          { allParks.map((value) => {
              return(<option key={value["id"]} data-id={value["id"]}>{value["parkName"]}</option>);
            } ) 
          }
          </Form.Control>
        </Col>
      </Row>

      <Row className="statisticRows">
        <Col md={6} sm={12}>
          <Row>
            <Col style={{paddingLeft : "0px"}}>
              <h4 style={{paddingBottom:"2%"}}>Ticket Status</h4>
            </Col>
          </Row>
          <Row>
            <Table bordered style={{width:"80%", backgroundColor: "rgba(255,255,255,.9)"}}>
              <thead>
                <tr> 
                  <th>Status</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {ticketStatusStats[selectedPark["parkId"]] 
                  && 
                    Object.keys(ticketStatusStats[selectedPark["parkId"]]).map((key, index)=> {
                      return (
                        <tr key={index}> 
                          <td>{key}</td> 
                          <td>{ticketStatusStats[selectedPark["parkId"]][key] ? ticketStatusStats[selectedPark["parkId"]][key] : 0 }</td>
                        </tr>
                      );
                    })
                  
                }
                <tr>
                  <td>Total</td>
                  <td>{groupedTickets[selectedPark["parkId"]] ? groupedTickets[selectedPark["parkId"]].length : 0} </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Col>
        <Col md={6} sm={12}>
          <Row>
            <Col style={{padding : "0px"}}><h4  className="categoryTitle">Category Breakdown</h4></Col>
          </Row>
          <Row >
            {chartData["labels"].length === 0 
            ? 
              <h5 style={{padding:"10%"}}>No Current Data</h5> 
            : 
              <Doughnut 
                options = {{ 
                  legend: {
                    display: true,
                    position: 'right',
                    labels: {
                      fontColor: 'black',
                      fontSize: 13
                    }
                  },
                }} 
                data={chartData} 
              />
            }
          </Row>
        </Col>
      </Row>
      
      <Row className="statisticRows">
        <Col style={{padding : "0px"}}>
          <h4 style={{paddingBottom:"1%"}}>History</h4>
          <ReactTable 
            data={groupedTickets[selectedPark["parkId"]]} 
            columns={tableColumns} 
            defaultPageSize={10} 
            filterable={true}
            className="employee"
          />
        </Col>
      </Row>
    </Container>
    </span>
  );
};

export default Statistics;