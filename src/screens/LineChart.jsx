import React from "react";
import LineChart from "../components/Charts/LineChart";

const ProductLineChart = (checkedProduct) => {

  const chartData = checkedProduct.checkedProduct.map((item, index) => ({
    year: ["2022", "2023", "2024", "2025"],
    productDemand: item.demand_forecast,
    sellingPrice: item.selling_price,
    productName: item.name
  }));



  return (
    <div>
      <h1 className="text-center text-white bg-dark py-3">Demand Forecast</h1>
      <LineChart data={chartData} />
    </div>
  );
};

export default ProductLineChart;
