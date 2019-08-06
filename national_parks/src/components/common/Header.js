import React from 'react';
import "./Header.css";
import nps from '../../images/nps.png';
import { Navbar} from 'react-bootstrap';
// import Login from './Login';
import LoginHeader from './LoginHeader';

const Header = () => {
  return (
    <Navbar bg="light" className="Header" expand="md">
      <Navbar.Brand>
      <img
        src={nps}
        width="30"
        // height="30"
        className="Logo"
        alt="National Parks Service Logo"
      />
        <span className="HeaderTitle">{'National Parks Service'}</span>
        
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <LoginHeader />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
