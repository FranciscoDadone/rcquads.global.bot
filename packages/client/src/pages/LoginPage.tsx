import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Container, Image, Alert } from 'react-bootstrap';
import '../assets/css/LoginPage.css';
import icon from '../assets/images/icon.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const login = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: {
        username,
        password,
      },
      withCredentials: true,
      url: '/auth/login',
    }).then((res) => {
      if (res.data === 'SUCCESS') {
        window.location.href = '/';
      } else {
        setShowError(true);
      }
    });
  };

  return (
    <Container className="main-container">
      <Container style={{ textAlign: 'center' }}>
        <br />
        <h1>Log-in</h1>
        <br />
        <hr />
        <br />
        <Image src={icon} fluid roundedCircle />
        <h4>RcQuadsGlobal</h4>
        <Alert
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
          style={{ display: showError ? 'block' : 'none' }}
        >
          <p>Incorrect username or password!</p>
        </Alert>
      </Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={login}>
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
