import React, {useState, useEffect} from 'react';
import "./Header.css";
import nps from '../../images/nps.png';
import { Navbar} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import './NavMenu.css';
import LoginHeader from './LoginHeader';
import { authenticationService } from '../../services/AuthenticationService';

const Header = () => {
  const [userLoggedOut, setUserLoggedOut] = useState(true);

  useEffect(() => {
    authenticationService.currentToken.subscribe(value => setUserLoggedOut(!value));
  });

  return (
    <Navbar fixed="top" bg="light" className="Header" expand="md">
      <Navbar.Brand>
      <img
        src={nps}
        width="30"
        className="Logo"
        alt="National Parks Service Logo"
      />
        <span className="HeaderTitle">{'National Parks Service'}</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        { 
          !userLoggedOut 
        && 
          <>
            <Nav.Item>
              <Nav.Link className="navLink" as={NavLink} to="/all-tickets">All Tickets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="navLink" as={NavLink} to="/my-tickets">My Tickets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="navLink" as={NavLink} to="/create-ticket">Create Ticket</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="navLink" as={NavLink} to="/statistics">Park Statistics</Nav.Link>
            </Nav.Item>
          </>
        }
        <LoginHeader />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;


// import React from 'react';


// const NavMenu = () => {
//   return (
//     <Navbar className="navMenu">

//         <Nav>
//           <Nav.Item>
//             <Nav.Link className="navLink" as={NavLink} to="/all-tickets">All Tickets</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link className="navLink" as={NavLink} to="/my-tickets">My Tickets</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link className="navLink" as={NavLink} to="/create-ticket">Create Ticket</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link className="navLink" as={NavLink} to="/statistics">Park Statistics</Nav.Link>
//           </Nav.Item>
//         </Nav>
//     </Navbar>
//   )
    
// }

// export default NavMenu;
