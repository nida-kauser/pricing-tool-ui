import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/globals.css";
import { ROUTES } from "../../constant/routes";
import axios from "axios";
const LoginForm = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(ROUTES.HOME);
  };

  const [token, setToken] = useState('str')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ROUTES.API_ROUTE}/login`, formData);

      // Handle the API response
      if (response.data.access_token) {
        setToken(response.data.access_token)
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("fullName", response.data.full_name);
        navigate(ROUTES.HOME);
      }

    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
    }
  };

  return (
    <>
      <div className="d-flex px-4 pt-3 bg-2c3034 ">
        <Button
          variant="link"
          className="text-white text-decoration-none"
          onClick={handleRedirect}
        >
          <i className="bi bi-arrow-left text-white"></i> Back
        </Button>
      </div>
      <div className="home-bg">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="text-white fs-40">
            BCG<span style={{ color: "#00d8ff" }}>X</span>
          </h1>
          <h2 className="mt-5 fs-50 fw-bold">Welcome to the Portal</h2>
          <p className="text-white">
            Login to explore the Price Optimization Tool.
          </p>
        </div>

        {/* Card Section */}
        <Container>
          <Row className="justify-content-center">
            {/* Login Form */}
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow" style={{ borderRadius: "10px" }}>
                <Card.Body>
                  <h3 className="fs-34 text-center mb-4">Login</h3>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LoginForm;
