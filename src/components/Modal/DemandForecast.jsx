import React from "react";
import { Modal } from "react-bootstrap";
import ProductLineChart from "../../screens/LineChart";
import DemandForecastTable from "../../screens/components/DemandForecastTable";

const DemandForecast = ({ show, handleClose, checkedProduct }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="xl bg-dark "
      variant="dark"
      className="dark-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Demand Forecast</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductLineChart checkedProduct={checkedProduct} />
        <div className="my-4">
          <DemandForecastTable checkedProduct={checkedProduct} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DemandForecast;
