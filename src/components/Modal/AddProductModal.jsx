import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES, access_token } from "../../constant/routes";

const AddProductModal = ({ show, handleClose, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    cost_price: "",
    selling_price: "",
    description: "",
    stock_available: "",
    units_sold: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To show loading state

  // Effect to populate the form with product data if editing
  useEffect(() => {
    if (product) {
      // Populate form fields for editing existing product
      setFormData({
        name: product.name,
        category: product.category,
        cost_price: product.cost_price,
        selling_price: product.selling_price,
        description: product.description,
        stock_available: product.stock_available,
        units_sold: product.units_sold,
      });
    } else {
      // Reset to empty fields for new product
      setFormData({
        name: "",
        category: "",
        cost_price: "",
        selling_price: "",
        description: "",
        stock_available: "",
        units_sold: "",
      });
    }
  }, [product]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (Add or Edit product)
  const handleSubmit = async () => {
    // Validate form inputs
    if (
      !formData.name ||
      !formData.category ||
      !formData.cost_price ||
      !formData.selling_price ||
      !formData.description ||
      !formData.stock_available ||
      !formData.units_sold
    ) {
      toast.error("All fields are required.", { position: "top-center" });
      return;
    }

    setIsSubmitting(true); // Show loading state

    const method = product ? "PUT" : "POST"; // Use PUT for editing, POST for adding
    const url = product
      ? `${ROUTES.API_ROUTE}/products/${product.product_id}/` // Update product by ID
      : `${ROUTES.API_ROUTE}/products/`; // Create new product

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        },
        body: JSON.stringify(formData), // Send the form data as the request body
      });

      if (response.ok) {
        const successMessage = product
          ? "Product updated successfully!"
          : "Product added successfully!";
        toast.success(successMessage, { position: "top-center" });

        // Close the modal after successful submission
        handleClose();
      } else {
        toast.error("Failed to save product. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
      window.location.reload();// Hide loading state
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Edit Product" : "Add New Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-fill">
              <Form.Label>Cost Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="XX,XXX,XXX"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 flex-fill">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="XX,XXX,XXX"
                name="selling_price"
                value={formData.selling_price}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-fill">
              <Form.Label>Available Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="XX,XXX,XXX"
                name="stock_available"
                value={formData.stock_available}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 flex-fill">
              <Form.Label>Units Sold</Form.Label>
              <Form.Control
                type="text"
                placeholder="XX,XXX,XXX"
                name="units_sold"
                value={formData.units_sold}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : product ? "Save Changes" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
