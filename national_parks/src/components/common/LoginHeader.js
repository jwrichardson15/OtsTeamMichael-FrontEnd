import React, { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Popover, } from 'react-bootstrap';
import Login from './Login';
import { authenticationService } from '../../services/AuthenticationService';

const LoginHeader = () => {

  // Function to call to set the loggedOut state in the component
  const [loggedOut, setLoggedOut] = useState(true);

  // Magic useEffect to set the loggedOut state from the AuthenticationService
  useEffect(() => {
    authenticationService.currentToken.subscribe(value => setLoggedOut(!value));
  });

  const doLogOut = () => {
    authenticationService.logout();
  }

  const popover = (
    <Popover id="popover-login">
      <Popover.Content>
        <Login />
      </Popover.Content>
    </Popover>
  );

  if (loggedOut) {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose={true}>
        <Button variant="success">Employee Login</Button>
      </OverlayTrigger>
    );
  } else {
    return (
      <Button variant="outline-success" onClick={doLogOut}>Logout</Button>
    );
  }
};

export default LoginHeader;
