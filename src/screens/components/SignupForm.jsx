import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/globals.css";
import { ROUTES } from "../../constant/routes";
import { toast } from "react-toastify";

const SignupForm = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(ROUTES.HOME);
  };
  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ROUTES.API_ROUTE}/register`, formData);

      // Handle the API response
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("All fields are required.", { position: "top-center" });
    } finally {
    }
  };

  return (
    <>
      <div className="d-flex px-4 bg-2c3034 ">
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
            Sign up to explore the Price Optimization Tool.
          </p>
        </div>

        {/* Card Section */}
        <Container>
          <Row className="justify-content-center">
            {/* Signup Form */}
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow" style={{ borderRadius: "10px" }}>
                <Card.Body>
                  <h3 className="fs-34 text-center mb-4">Sign Up</h3>
                  <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100"
                    >
                      {"Sign Up"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <p className="fs-50 fw-bold">

          <span onClick={handleLogin} style={{ cursor: "pointer" }}>Login</span>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
