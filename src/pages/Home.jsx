import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/globals.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = (route) => {
    navigate(route);
  };

  return (
    <div>

      {/* Header Section */}
      <div className="home-bg">
        <div className="text-center mb-5 ">
          <h1 className="text-white fs-40">
            BCG<span style={{ color: "#00d8ff" }}>X</span>
          </h1>
          <h2 className="mt-5 fs-50 fw-bold">Price Optimization Tool</h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        {/* Card Section */}
        <Container>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow" style={{ borderRadius: "10px" }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <div className="mb-5" style={{ fontSize: "2rem" }}>
                      📦
                    </div>
                    <Card.Title className="fs-34">
                      Create and Manage Product
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Card.Text>
                  </div>
                  <div
                    className="mt-5 cursor-pointer"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() =>
                      handleRedirect(ROUTES.CREATEANDMANAGEPRODUCT)
                    }
                  >
                    →
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100 shadow" style={{ borderRadius: "10px" }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <div className="mb-5" style={{ fontSize: "2rem" }}>
                      📈
                    </div>
                    <Card.Title className="fs-34">
                      Pricing Optimization
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Card.Text>
                  </div>

                  <div
                    className="mt-5 cursor-pointer"
                    style={{ fontSize: "1.5rem" }}
                    onClick={() =>
                      handleRedirect(ROUTES.PRICE_OPTIMIZATION)
                    }
                  >
                    →
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
