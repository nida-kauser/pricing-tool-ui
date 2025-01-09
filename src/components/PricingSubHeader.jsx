import React, { useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import AddProductModal from "./Modal/AddProductModal";
import DemandForecast from "./Modal/DemandForecast";

const PricingSubHeader = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseForecastModal = () => setShowForecastModal(false);

  const handleRedirect = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <>
      <Row className="align-items-center px-4 py-2 bg-dark py-2">
        <Col md={3} className="d-flex align-items-center">
          <Button
            variant="link"
            className="text-white text-decoration-none"
            onClick={handleRedirect}
          >
            <i className="bi bi-arrow-left text-white"></i> Back
          </Button>
          <div className="vr" />
          <h5 className="ms-3 mb-0">Pricing Optimzation</h5>
        </Col>

        <Col md={9} className="d-flex justify-content-end align-items-center">
          <Form.Check
            type="switch"
            id="demand-forecast-toggle"
            label="With Demand Forecast"
            className="text-white me-3"
          />
          <InputGroup className="me-3" style={{ maxWidth: "250px" }}>
            <Form.Control type="text" placeholder="Search" />
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
          </InputGroup>
          <Form.Select
            aria-label="Category"
            className="me-3"
            style={{ maxWidth: "200px" }}
          >
            <option>Category: Stationary</option>
            <option value="1">Electronics</option>
            <option value="2">Groceries</option>
            <option value="3">Clothing</option>
          </Form.Select>
          <Button variant="outline-success" className="me-2">
            <i className="bi bi-funnel"></i> Filter
          </Button>

        </Col>
      </Row>
      <AddProductModal show={showModal} handleClose={handleCloseModal} />
      <DemandForecast
        show={showForecastModal}
        handleClose={handleCloseForecastModal}
      />
    </>
  );
};

export default PricingSubHeader;
