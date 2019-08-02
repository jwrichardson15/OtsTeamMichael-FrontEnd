import React, {useState, useEffect} from 'react';
import { Modal, Container, Row, Col, Form } from 'react-bootstrap';

const EditTicketModal = (props) => {
  
  return (
    <Modal show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>View Ticket {props.currentTicket["id"]}</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["categoryName"]}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["status"]}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Client Email</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["email"]}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["dateCreated"]}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["description"]}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Label>Employee Username</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["employeeUsername"]}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    // as={"select"}
                    defaultValue={props.currentTicket["employeeNotes"]}
                    disabled={true}
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
      </Modal>
  );
};

export default EditTicketModal;