import React, { useState } from 'react';
import { Button, Form, FormControl, Spinner} from 'react-bootstrap';
import { authenticationService } from '../../services/AuthenticationService';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const LoginStatus = ({status}) => {
    if (status == "loading") {
      return <span className="ml-2"><Spinner animation="border" size="sm"/></span>;
    } else if (status == "error") {
      return <span className="ml-2" style={{color: 'red'}}>Login Failed</span>;
    }
    return null;
  }

  const doLogin = (event) => {
    setStatus("loading");
    event.preventDefault();
    authenticationService.login(username, password).catch(() => {
      setStatus("error");
    });
  }

  const handleUsername = () => event => {
    setUsername(event.target.value);
  };

  const handlePassword = () => event => {
    setPassword(event.target.value);
  };

  return (
    <Form onSubmit={doLogin}>
      <FormControl type="text" placeholder="Username" className="mr-sm-2" value={username} onChange={handleUsername()}/>
      <FormControl type="password" placeholder="Password" className="mr-sm-2" value={password} onChange={handlePassword()} />
      <Button variant="outline-success" type="submit">Login</Button>
      <LoginStatus status={status} />
    </Form>
  );
}

export default Login;
