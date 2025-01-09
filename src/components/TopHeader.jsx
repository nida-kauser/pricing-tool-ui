import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TopHeader = () => {
  const fullName = localStorage.getItem("fullName")
  return (
    <>
      <Row className="align-items-center py-3 px-4">
        <Col md={6}>
          <h3 className="text-success">Price Optimization Tool</h3>
        </Col>
        <Col md={6} className="text-end">
          <span>
            Welcome, <span className="text-info">{fullName}</span>
          </span>
          <i
            className="bi bi-person-circle ms-2 text-white"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </Col>
      </Row>
    </>
  );
};

export default TopHeader;
