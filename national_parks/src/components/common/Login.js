import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { authenticationService } from '../../services/AuthenticationService';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = () => {
    authenticationService.login(username, password);
  }

  const handleUsername = () => event => {
    setUsername(event.target.value);
  };

  const handlePassword = () => event => {
    setPassword(event.target.value);
  };

  return (
    <Form inline>
      <FormControl type="text" placeholder="Username" className="mr-sm-2" value={username} onChange={handleUsername()}/>
      <FormControl type="password" placeholder="Password" className="mr-sm-2" value={password} onChange={handlePassword()} />
      <Button variant="outline-success" onClick={doLogin} onKeyPress={doLogin}>Login</Button>
    </Form>
  );
}

export default Login;
