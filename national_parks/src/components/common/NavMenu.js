import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <Navbar>
        <Navbar.Brand>NavBar</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/createTicket">Create Ticket</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/allTickets">All Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/myTickets">My Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Link>Logout</Nav.Link>
        </Nav>
    </Navbar>
  )
    
}

export default NavMenu;
