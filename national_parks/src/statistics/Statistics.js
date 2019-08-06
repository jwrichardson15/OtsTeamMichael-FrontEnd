import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {authenticationService} from '../services/AuthenticationService';
import { getCategories } from '../api/categoryApi';
import { getStatuses } from '../api/statusApi';
import { getParks } from '../api/parkApi';
import { getParkTickets } from '../api/employeeTicketApi';
import ReactTable from 'react-table';
import { Table, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import './Statistics.css';

const Statistics = () => {
  const [selectedPark, setSelectedPark] = useState({});
  const [user, setUser] = useState();
  const [allParks, setAllParks] = useState([]);

  const [groupedTickets, setGroupedTickets] = useState({});
  const [ticketStatusStats, setTicketStatusStats] = useState({});
  const [ticketCategoryStats, setTicketCategoryStatus] = useState({});
  const [chartData, setChartData] = useState({category: {labels: [], datasets: {}}, status: {labels: [], datasets: {}}});
  const [statusStats, setStatusStats] = useState({});
  const [categoryStats, setCategoryStats] = useState({});
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState({legend: {
    display: true,
    position: 'right'
  },});

  useEffect(() => {
    //setting the user and the selected park
    authenticationService.currentUser.subscribe(value => {
      if (value != null) {
        setUser(value);
        setSelectedPark({
          "parkId": value["parkId"],
          "parkName": value["parkName"]
        });
      }
    });
    //obtain information of all the parks - for the dropdown
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
      setCategories(result);
      result.forEach(category => {
        console.log(category["name"]);
        category_[category["name"]] = 0
        console.log(category_);
      });
      setCategoryStats({...category_});
    });
  }, []);

  useEffect(() => {
    getParkTickets().then(result => {
      let parkTickets = {};
      let parkStatusStats = {};
      let parkCategoryStats = {};
      console.log(categoryStats)
      result.forEach(ticket => {
        console.log(ticket);
        if(parkTickets[ticket["parkId"]]) {
          parkTickets[ticket["parkId"]].push(ticket);
        }
        else {
          // console.log(statusStats);
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
    // console.log('Just updated...');
    const result = _updateStatusChartData();
    // console.log(result);
    setChartData({
      ...chartData,
      ["status"] : result
    });
    
  }, [selectedPark, ticketStatusStats]);

  useEffect(() => {
    // console.log('Just updated...');
    const result = _updateCategoryChartData();
    // console.log(result);
    setChartData({
      ...chartData,
      ["category"] : result
    });
    
  }, [selectedPark, ticketCategoryStats]);

  const _updateStatusChartData = () => {
    let labels = [];
    let dataset = [];
    
    if(ticketStatusStats[selectedPark["parkId"]]) {
      Object.entries(ticketStatusStats[selectedPark["parkId"]]).map(([key, value]) => {
        labels.push(key);
        // datasets["data"].push(value);
        dataset.push(value);
        // console.log(dataset)
      });
    }
    // console.log(labels, dataset);
    return {
      labels: labels,
      datasets: [{
        data: dataset,
        backgroundColor: ["#d88c4d", "#5f6f3a", "#8e7d69"],
        hoverBackgroundColor: [
          "#C56C39",
          "#56903A",
          "#7F7F7F"]
      }]
    };
  };

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
        backgroundColor: ["#d88c4d", "#5f6f3a", "#8e7d69", "#f5e1b9", "#e2b553", "#464232", "#5CAE34", "#8C8383"],
        hoverBackgroundColor: [
          "#C56C39",
          "#56903A",
          "#7F7F7F"]
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
      width: 50
    },
    {
      accessor: 'status',
      Header: 'Status',
      width: 150,
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
      Header: 'Date Created'
      // Cell: props => <span className='number'>{props.value.toLocale}</span>
    },
    {
      accessor: 'employeeUsername',
      Header: 'Assigned Employee',
    }
  ];

  

  return (
    <>
    <h3>{selectedPark["parkName"]} Statistics</h3>
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
        <Col md={6}>
          <Row>
            <Col style={{paddingLeft : "0px"}}>
              <h4 style={{paddingBottom:"2%"}}>Ticket Status</h4>
            </Col>
          </Row>
          <Row>
            <Table bordered style={{width:"80%", backgroundColor: "white"}}>
              <thead>
                <tr> 
                  <th>Status</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {
                  ticketStatusStats[selectedPark["parkId"]] 
                  ? 
                    Object.keys(ticketStatusStats[selectedPark["parkId"]]).map((key, index)=> {
                      return (
                        <tr> 
                          <td>{key}</td> 
                          <td>{ticketStatusStats[selectedPark["parkId"]][key]}</td>
                        </tr>
                      );
                    })
                  : 
                    <> </>
                }
                <tr>
                  <td>Total</td>
                  <td>{groupedTickets[selectedPark["parkId"]] ? groupedTickets[selectedPark["parkId"]].length : 0} </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col style={{padding : "0px"}}><h4 style={{paddingLeft: "10%", paddingBottom:"2%"}}>Category Breakdown</h4></Col>
          </Row>
          <Row>
            {chartData["category"]["labels"].length === 0 
            ? 
              <h5 style={{padding:"10%"}}>No Current Data</h5> 
            : 
              <Doughnut options={{ responsive: true }} data={chartData["category"]} options={options} />
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
          />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Statistics;