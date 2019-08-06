import React from 'react';
import "./Header.css";
import nps from '../../images/nps.png';
import { Navbar} from 'react-bootstrap';
// import Login from './Login';
import LoginHeader from './LoginHeader';

const Header = () => {
  return (
    <Navbar bg="light" className="Header">
      <Navbar.Brand>
      <img
        src={nps}
        width="30"
        // height="30"
        className="d-inline-block align-top"
        alt="National Parks Service Logo"
      />
        {' National Parks Service'}
        
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">
        <LoginHeader />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
