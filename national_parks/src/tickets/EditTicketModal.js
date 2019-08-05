import React, {useState, useEffect} from 'react';
import { Modal, Row, Col, Form, Button, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faSave, faEye } from '@fortawesome/free-solid-svg-icons';
import { getCategories } from '../api/categoryApi';
import { getStatuses } from '../api/statusApi';
import './EditTicketModal.css';

const EditTicketModal = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [editingTicket, setEditingTicket] = useState(props.currentTicket);
  const [initalTicket, setInitialTicket] = useState({});
  
  useEffect(() => {
    let edit = props.currentTicket;
    setEditingTicket(edit);

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
    setEditingTicket(props.currentTicket);
    setInitialTicket(props.currentTicket);
  }, [props.currentTicket])

  const _handleEdit = () => {
    setInitialTicket({...editingTicket});
    setEditMode(true);
  }

  const _handleSave = () => {
    props.onSave(initalTicket);
    setEditingTicket(initalTicket);
    setEditMode(false);
  }

  const _handleCancel = () => {
    let response = props.onCancel(editingTicket);
    setEditMode(false);
    setInitialTicket({...editingTicket});
  }

  const _handleChange = (category) => event => {
    setInitialTicket({
      ...initalTicket,
      [category]: event.target.value
    });
  }

  const _handleDropdown = (categoryId, categoryName) => event => {
    const selectedIndex = event.target.options.selectedIndex;
    setInitialTicket({
      ...initalTicket,
      [categoryName]: event.target.value,
      [categoryId]: event.target.options[selectedIndex].getAttribute('data-id')
    });
  }

  const _handleClose = () => {
    setInitialTicket({...editingTicket});
    setEditMode(false);
    props.hide();
  }

  const _handleAssignment = (assign) => {
    editingTicket["employeeUsername"] = assign ? props.user["username"] : null;
    setEditingTicket(editingTicket);
    props.assignment(assign);
  }

  return (
    <Modal show={props.show} onHide={_handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Ticket {editingTicket["id"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <ButtonToolbar className="editSaveModal"> 
                  {
                    !editMode 
                    ?
                    <Button size="sm" onClick={() => _handleEdit()} variant="primary"><FontAwesomeIcon icon={faEdit} /></Button>
                    :
                    <> <Button size="sm" onClick={() => _handleSave()} variant="success"><FontAwesomeIcon icon={faSave} /></Button>
                    <Button size="sm" onClick={() => _handleCancel()} variant="danger"><FontAwesomeIcon icon={faBan} /></Button> </>
                  }
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Category</Form.Label>
                    <Form.Control
                      as={"select"}
                      value={initalTicket["categoryName"]}
                      disabled={!editMode}
                      onChange={_handleDropdown("categoryId", "categoryName")}
                    > 
                    { categories.map((value) => {
                        return(<option key={value["id"]} data-id={value["id"]}>{value["name"]}</option>);
                      } ) 
                    }
                    </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Status</Form.Label>
                    <Form.Control
                      as={"select"}
                      value={initalTicket["status"]}
                      disabled={!editMode}
                      onChange={_handleDropdown("statusId", "status")}
                    > 
                    { statuses.map((value) => {
                        return(<option key={value["id"]} data-id={value["id"]}>{value["name"]}</option>);
                      } ) 
                    }
                    </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Client Email</Form.Label>
                  <Form.Control
                    defaultValue={initalTicket["email"]}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control
                    defaultValue={initalTicket["dateCreated"]}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={initalTicket["description"] || ''} 
                    disabled={!editMode}
                    onChange={_handleChange("description")}
                  />
                </Col>
                <Col>
                  <Form.Label>Employee Username</Form.Label>
                  <Form.Control
                    value={initalTicket["employeeUsername"] || ''}
                    disabled={true}
                  />
                  {props.currentTicket["employeeUsername"] === props.user["username"] 
            ? 
              <Button variant="danger" onClick={() => {_handleAssignment(false)}} size="sm">Unassign</Button> 
          :
            <Button variant="success"  onClick={() => {_handleAssignment(true)}} size="sm">Assign</Button>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    value={initalTicket["employeeNotes"] || ''}
                    disabled={!editMode}
                    onChange={_handleChange("employeeNotes")}
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
      </Modal>
  );
};

export default EditTicketModal;