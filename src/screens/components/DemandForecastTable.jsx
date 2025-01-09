import React from "react";
import {
  Row,
  Table
} from "react-bootstrap";
import "../../styles/globals.css";

const DemandForecastTable = (checkedProduct) => {
  return (
    <>
      {/* Product Table */}
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
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Available Stock</th>
              <th>Units Sold</th>
              <th>Calculated Demand Forecast</th>
            </tr>
          </thead>
          <tbody>
            {checkedProduct.checkedProduct.map((product, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >

                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.cost_price}</td>
                <td>{product.selling_price}</td>
                <td>{product.stock_available}</td>
                <td>{product.units_sold}</td>
                <td>{product.demand_forecast}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default DemandForecastTable;
