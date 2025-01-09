
import {
  Row,
  Table,
  Button,
  Form,

} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import React, { useState } from "react";
import { ROUTES } from "../../constant/routes";
import AddProductModal from "../../components/Modal/AddProductModal";
var updatedArray = []
const ManageProductTable = ({ products, is_pricing_optimzation, withDemandForecast, setCheckedProduct, checkedProduct }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleCheckboxChange = (record) => {
    const isAlreadySelected = updatedArray.some((item) => item.product_id === record.product_id);
    if (isAlreadySelected) {
      // If already selected, remove it
      updatedArray = updatedArray.filter((item) => item.product_id !== record.product_id);
    } else {
      // Otherwise, add it to the array
      updatedArray.push(record);
    }

    // Now update the state with the modified array
    setCheckedProduct(updatedArray);
  }

  const handleDelete = (product,) => {
    try {
      const response = fetch(`${ROUTES.API_ROUTE}/products/${product.product_id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      }
      );

      if (response.ok) {
        toast.success("Product Deleted successfully!", { position: "top-center" });
      } else {
        toast.error("Failed to delete product. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", { position: "top-center" });
    } finally {
      window.location.reload();
    }
  }

  return (
    <>
      <Row className="p-4">

        <Table
          striped
          bordered
          hover
          responsive
          className="shadow product-table"
        >
          <thead className="bg-000000 text-white">
            <tr>
              {!is_pricing_optimzation && (<th>
                <Form.Check type="checkbox" />
              </th>)}
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Description</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              {is_pricing_optimzation && (
                <th>Optimized Price</th>
              )}
              {withDemandForecast && (
                <th>Demand Forecast</th>
              )}

              {!is_pricing_optimzation && (<th>Available Stock</th>)}
              {!is_pricing_optimzation && (<th>Units Sold</th>)}
              {!is_pricing_optimzation && (<th>Action</th>)}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id || index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                {!is_pricing_optimzation && (<td>
                  <Form.Check type="checkbox" onChange={() => handleCheckboxChange(product)} />
                </td>)}
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>${product.cost_price}</td>
                <td>${product.selling_price}</td>
                {is_pricing_optimzation && (
                  <td ><span style={{ float: "left", color: "grey" }}> ${product.cost_price}</span><span style={{ float: "right", color: "green" }}> ${product.optimized_price}</span></td>
                )}
                {withDemandForecast && (
                  <td style={{ color: "green" }}>{product.demand_forecast}</td>
                )}
                {!is_pricing_optimzation && (<td>{product.stock_available}</td>)}
                {!is_pricing_optimzation && (<td>{product.units_sold}</td>)}
                {!is_pricing_optimzation && (<td>
                  <Button variant="link" className="text-primary" onClick={() => handleOpenModal(product)}>
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button variant="link" className="text-warning" onClick={() => handleOpenModal(product)} >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="link" className="text-danger" onClick={() => handleDelete(product)} >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>)}
              </tr>
            ))}
          </tbody>
        </Table>

      </Row>
      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        product={selectedProduct} // Pass the selected product for editing or viewing
      />
    </>
  );
};

export default ManageProductTable;
