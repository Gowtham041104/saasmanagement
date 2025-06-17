import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/userAction';
import { useNavigate, Link } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload(); // Optionally reload to reset state/UI
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-dark">TenantHub</h3>
                  <p className="text-dark">SaaS Tenant Management Platform</p>
                </div>

                {userInfo ? (
                  <>
                    <div className="alert alert-success text-center">
                      Logged in as <strong>{userInfo.email}</strong>
                    </div>
                    <Button
                      variant="danger"
                      className="w-100 btn-lg"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Form onSubmit={submitHandler}>
                      {error && (
                        <div className="alert alert-danger py-2 text-center">
                          {error}
                        </div>
                      )}
                      {loading && (
                        <div className="text-center py-2">
                          <span className="spinner-border spinner-border-sm text-primary"></span>
                        </div>
                      )}

                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label className="fw-semibold text-dark">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-lg"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="password" className="mb-3">
                        <Form.Label className="fw-semibold text-dark">Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg"
                          required
                        />
                      </Form.Group>

                      <Button type="submit" className="btn btn-primary w-100 btn-lg">
                        Sign In
                      </Button>
                    </Form>

                    <div className="text-center mt-3">
                      <span className="text-muted">Don't have an account?</span>{' '}
                      <Link to="/register" className="fw-semibold text-primary">
                        Sign up
                      </Link>
                    </div>
                  </>
                )}

                <div className="text-center mt-4 small text-dark">
                  Demo: Use any email/password
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;
