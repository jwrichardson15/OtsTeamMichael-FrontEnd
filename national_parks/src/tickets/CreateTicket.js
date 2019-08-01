// Still needed:
// Responses for tickets being created or failed
import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { getCategories } from '../api/categoryApi';
import { getParks } from '../api/parkApi';
import { createTicket } from '../api/ticketApi';

const CreateTicket = () => {

  const [categoriesData, setCategoriesData] = useState([]);
  const [parksData, setParksData] = useState([]);
  const [ticketData, setTicketData] = useState({"parkId": 0, "categoryId": 0, "email": "", description: "", "statusId": 1});

  useEffect(() => {
    getCategories()
      .then(categoriesDataResponse => {
        setCategoriesData(categoriesDataResponse);
        console.log(categoriesDataResponse);
      })
      .catch(() => {
        console.log("Failed to load categories data");
      });
  }, []);

  useEffect(() => {
    getParks()
      .then(parksDataResponse => {
        setParksData(parksDataResponse);
        console.log(parksDataResponse);
      })
      .catch(() => {
        console.log("Failed to load parks data");
      });
  }, []);

  const handleChange = field => event => {
    setTicketData({
      ...ticketData,
      [field]: event.target.value
    });
  };

  const handleSubmit = event => {
    createTicket(ticketData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Create Ticket</h3>
      <Form.Row>
        <Form.Group as={Col} controlId="formCreateTicketPark">
          <Form.Label>Park</Form.Label>
          <Form.Control as="select" onChange={handleChange('parkId')} value={ticketData.park}>
            <option value="0">Select Park</option>
            {parksData.map((value, index) => {return <option key={index} value={value.id}>{value.parkName}</option>})}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formCreateTicketCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" onChange={handleChange('categoryId')} value={ticketData.category}>
            <option value="0">Select Category</option>
            {categoriesData.map((value, index) => {return <option key={index} value={value.id}>{value.name}</option>})}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formCreateTicketEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={ticketData.email} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formCreateTicketDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={handleChange('description')} value={ticketData.description} />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateTicket;
