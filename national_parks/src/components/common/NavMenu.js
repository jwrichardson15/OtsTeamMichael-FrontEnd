import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <Navbar className="navMenu">
        <Navbar.Brand>NavBar</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link className="navLink" as={NavLink} to="/all-tickets">All Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="navLink" as={NavLink} to="/my-tickets">My Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="navLink" as={NavLink} to="/create-ticket">Create Ticket</Nav.Link>
          </Nav.Item>
        </Nav>
    </Navbar>
  )
    
}

export default NavMenu;
