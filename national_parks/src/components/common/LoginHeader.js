import React, { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Popover, } from 'react-bootstrap';
import Login from './Login';
import { authenticationService } from '../../services/AuthenticationService';
import { withRouter } from 'react-router-dom';

const LoginHeader = (props) => {

  // Function to call to set the loggedOut state in the component
  const [loggedOut, setLoggedOut] = useState(true);
  const [name, setName] = useState("");

  // Magic useEffect to set the loggedOut state from the AuthenticationService
  useEffect(() => {
    authenticationService.currentToken.subscribe(value => setLoggedOut(!value));
    authenticationService.currentUser.subscribe(value => doSetName(value));
  });

  const doSetName = user => {
    if (user != null) {
      setName(user.fname + " " + user.lname);
    }
  }

  const doLogOut = () => {
    authenticationService.logout();
    props.history.push('/');
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
        <Button variant="dark">Employee Login</Button>
      </OverlayTrigger>
    );
  } else {
    return (
      <React.Fragment>
        <span className="mr-2">Welcome {name}!</span>
        <Button variant="outline-dark" onClick={doLogOut}>Logout</Button>
      </React.Fragment>
    );
  }
};

export default withRouter(LoginHeader);
