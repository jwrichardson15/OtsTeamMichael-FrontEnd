import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css";
import nps from '../../images/nps.png';

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
    </Navbar>
  );
};

export default Header;