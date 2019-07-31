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
            <Nav.Link as={NavLink} to="/create-ticket">Create Ticket</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/all-tickets">All Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/my-tickets">My Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Link>Logout</Nav.Link>
        </Nav>
    </Navbar>
  )
    
}

export default NavMenu;
