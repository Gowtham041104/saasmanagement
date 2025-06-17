import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister || {});
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard'); // Only go to dashboard if user is successfully registered
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!form.agree) {
      alert('You must agree to terms');
      return;
    }
    dispatch(register(form.username, form.email, form.password));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Signup Here</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <div className="text-center"><span className="spinner-border spinner-border-sm text-primary" /></div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Check
              className="mt-3"
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              label="Agree to terms and conditions"
            />

            <Button className="mt-3 w-100" type="submit" variant="success">
              Signup
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already a user? <a href="/login">Login</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupScreen;
