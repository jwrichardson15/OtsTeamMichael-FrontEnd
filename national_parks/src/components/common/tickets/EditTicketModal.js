import React, {useState, useEffect} from 'react';
import { Modal, Row, Col, Form, Button, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { getCategories } from '../../../api/categoryApi';
import { getStatuses } from '../../../api/statusApi';
import './EditTicketModal.css';
import moment from 'moment';

const EditTicketModal = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [initialTicket, setInitialTicket] = useState(props.currentTicket);
  const [editingTicket, setEditingTicket] = useState({});
  
  useEffect(() => {
    let edit = props.currentTicket;
    setInitialTicket(edit);

    getCategories()
      .then(result => {
        setCategories(result);
      });
    getStatuses()
      .then(result => {
        setStatuses(result);
      });
  }, [props.currentTicket]);

  useEffect(() => {
    setInitialTicket(props.currentTicket);
    setEditingTicket(props.currentTicket);
  }, [props.currentTicket])

  const _handleEdit = () => {
    setEditingTicket({...initialTicket});
    setEditMode(true);
  }

  const _handleSave = () => {
    props.onSave(editingTicket);
    setInitialTicket(editingTicket);
    setEditMode(false);
  }

  const _handleCancel = () => {
    props.onCancel(initialTicket);
    setEditMode(false);
    setEditingTicket({...initialTicket});
  }

  const _handleChange = (category) => event => {
    setEditingTicket({
      ...editingTicket,
      [category]: event.target.value
    });
  }

  const _handleDropdown = (categoryId, categoryName) => event => {
    const selectedIndex = event.target.options.selectedIndex;
    setEditingTicket({
      ...editingTicket,
      [categoryName]: event.target.value,
      [categoryId]: event.target.options[selectedIndex].getAttribute('data-id')
    });
  }

  const _handleClose = () => {
    setEditingTicket({...initialTicket});
    setEditMode(false);
    props.hide();
  }

  // const _handleAssignment = (assign) => {
  //   initialTicket["employeeUsername"] = assign ? props.user["username"] : null;
  //   setInitialTicket(initialTicket);
  //   //need to receive value here and update the not editing state tickets
    
  //   props.assignment(assign);
  // }

  return (
    <Modal show={props.show} onHide={_handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {!editMode ? 'View ' : 'Edit '} {initialTicket["parkName"]}-Ticket {initialTicket["id"]}</Modal.Title>
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
                    <Button size="sm"  onClick={() => _handleCancel()} variant="danger"><FontAwesomeIcon icon={faBan} /></Button> </>
                  }
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Category</Form.Label>
                    <Form.Control
                      as={"select"}
                      value={editingTicket["categoryName"]}
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
                      value={editingTicket["status"]}
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
                    defaultValue={editingTicket["email"]}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Label>Date Created</Form.Label>
                  <Form.Control
                    defaultValue={ props.currentTicket["dateCreated"] ? moment(props.currentTicket["dateCreated"]).format("MMM DD, YYYY hh:mma") : 'N/A'} 
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={editingTicket["description"] || ''} 
                    disabled={!editMode}
                    onChange={_handleChange("description")}
                  />
                </Col>
                <Col>
                  <Form.Group controlId="editTicketModalEmployeeUsername">
                    <Form.Label>Employee Username</Form.Label>
                    <Form.Control
                      value={editingTicket["employeeUsername"] || ''}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Employee Notes</Form.Label>
                    <Form.Control
                      value={editingTicket["employeeNotes"] || ''}
                      disabled={!editMode}
                      onChange={_handleChange("employeeNotes")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
      </Modal>
  );
};

export default EditTicketModal;
