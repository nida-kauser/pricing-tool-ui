import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DemandForecast from "../components/Modal/DemandForecast";
import AddProductModal from "../components/Modal/AddProductModal";
import TopHeader from "../components/TopHeader";
import ManageProductTable from "../screens/components/ManageProductTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
const ProductTable = () => {


  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseForecastModal = () => setShowForecastModal(false);

  const handleRedirect = () => {
    navigate(ROUTES.HOME);
  };
  const fetchProducts = async (search = "", category = "") => {
    try {
      let url = `${ROUTES.API_ROUTE}/products/?name=${search}&category=${category}`
      const response = await fetch(url); // Replace with your API URL
      const data = await response.json();
      setProducts(data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts("", "");
  }, []);

  const handleSearch = () => {
    fetchProducts(searchTerm, "");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    fetchProducts(searchTerm, selectedCategory);
  };


  return (
    <Container fluid className="bg-2c3034 text-white vh-100">
      {/* Header Section */}
      <TopHeader />
      {/* <PricingSubHeader /> */}
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
              <Form.Control type="text" placeholder="Search By Name" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
              <InputGroup.Text onClick={handleSearch} style={{ cursor: "pointer" }}>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Select
              aria-label="Category"
              className="me-3"
              style={{ maxWidth: "200px" }}
              value={category}
              onChange={handleCategoryChange}
            >
              <option value=""></option>
              <option value="Stationary">Stationary</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Clothing">Clothing</option>
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
      {/* Product Table */}

      <ManageProductTable products={products} is_pricing_optimzation={true} />

      <Row className="p-3">
        <Col className="text-end">
          <Button variant="outline-light" className="me-2">
            Cancel
          </Button>
          <Button variant="success">Save</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductTable;
