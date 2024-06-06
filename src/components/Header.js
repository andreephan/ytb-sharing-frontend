import React, { useState }  from 'react';
import axios from 'axios';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Header = ({ user, onUserUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let response;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/sessions`, { email, password });
      if (response.data.user) {
        onUserUpdate({email: response.data.user});
      }
      localStorage.setItem('token', response.data.token);
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Error logging in');
    }
  }

  const handleLogout = () => {
    onUserUpdate({});
    localStorage.removeItem('token');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Funny Movies</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        {user.email ? (
          <>
            <Navbar.Text className="mr-3">Welcome {user.email}</Navbar.Text>
            <Button variant="primary" href="/share" className="mr-2">
              Share a movie
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Form inline onSubmit={handleSubmit} className='d-flex align-items-center g-3'>
              <FormControl
                type="email"
                placeholder="email"
                className="mr-sm-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl
                type="password"
                placeholder="password"
                className="mr-sm-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outline-success" type="submit">Login / Register</Button>
            </Form>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
