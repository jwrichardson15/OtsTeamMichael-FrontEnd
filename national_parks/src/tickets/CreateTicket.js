// Still needed:
// Responses for tickets being created or failed
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { getCategories } from '../api/categoryApi';
import { getParks } from '../api/parkApi';
import { createTicket } from '../api/ticketApi';

const CreateTicket = () => {

  const ticketDefault = {"parkId": 0, "categoryId": 0, "email": "", description: "", "statusId": 1};

  const [formStatus, setFormStatus] = useState("");
  const [formText, setFormText] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  const [parksData, setParksData] = useState([]);
  const [ticketData, setTicketData] = useState(ticketDefault);

  useEffect(() => {
    getCategories()
      .then(categoriesDataResponse => {
        setCategoriesData(categoriesDataResponse);
      })
      .catch(() => {
        console.log("Failed to load categories data");
      });
  }, []);

  useEffect(() => {
    getParks()
      .then(parksDataResponse => {
        setParksData(parksDataResponse);
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

  const StatusAlert = ({status, statusText, setStatus}) => {
    if (["success", "warning", "danger"].includes(status)) {
      return (
        <Alert variant={status} onClose={() => setStatus("")} dismissible>
          {statusText}
        </Alert>
      );
    }
    return null;
  }

  const handleFailure = () => {
    setFormStatus("danger");
    setFormText("An error occured. Please try again.");
  };

  const handleSuccess = () => {
    setFormStatus("success");
    setFormText("Thank you for submitting!");
    setTicketData(ticketDefault);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (ticketData.parkId === "0" || ticketData.categoryId === "0" ||
        ticketData.parkId === 0 || ticketData.categoryId === 0) {
      setFormStatus("warning");
      setFormText("A Park and Category MUST be specified.");
    } else {
      createTicket(ticketData)
        .then(tickDataResponse => {
          handleSuccess();
        })
        .catch(() => {
          handleFailure();
        });
    }
  };

  return (
    <React.Fragment>
      <StatusAlert status={formStatus} statusText={formText} setStatus={setFormStatus}/>
      <Form className='form' onSubmit={handleSubmit}>
        <h3 className='createHeader'>Create Ticket</h3>
        <h6>Park Visitors! If you had any issues during your visit, please let us know by filling out this form.</h6>
        <Form.Row>
          <Form.Group as={Col} controlId="formCreateTicketPark">
            <Form.Label>Park</Form.Label>
            <Form.Control as="select" onChange={handleChange('parkId')} value={ticketData.parkId}>
              <option value="0">Select Park</option>
              {parksData.map((value, index) => {return <option key={index} value={value.id}>{value.parkName}</option>})}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formCreateTicketCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={handleChange('categoryId')} value={ticketData.categoryId}>
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
    </React.Fragment>
  );
};

export default CreateTicket;
