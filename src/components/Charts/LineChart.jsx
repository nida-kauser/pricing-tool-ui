import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = (data) => {

  const chartRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 70, left: 50 }; // Increased bottom margin for legend
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;


    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(data.data.map((d) => d.productName))
      .range([0, width])
      .padding(0.5);

    const y = d3.scaleLinear().domain([2020, 2025]).range([height, 0]);

    // X-axis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Y-axis
    svg
      .append("g")
      .attr("class", "axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => d)
      );

    const lineDemand = d3
      .line()
      .x((d) => x(d.product))
      .y((d) => y(d.productDemand))
      .curve(d3.curveCatmullRom);

    const linePrice = d3
      .line()
      .x((d) => x(d.product))
      .y((d) => y(d.sellingPrice))
      .curve(d3.curveCatmullRom);

    // Line for Product Demand
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .attr("d", lineDemand);

    // Line for Selling Price
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "cyan")
      .attr("stroke-width", 2)
      .attr("d", linePrice);

    // Dots for Product Demand
    svg
      .selectAll(".dot-demand")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-demand")
      .attr("cx", (d) => x(d.product))
      .attr("cy", (d) => y(d.productDemand))
      .attr("r", 4)
      .attr("fill", "purple");

    // Dots for Selling Price
    svg
      .selectAll(".dot-price")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-price")
      .attr("cx", (d) => x(d.product))
      .attr("cy", (d) => y(d.sellingPrice))
      .attr("r", 4)
      .attr("fill", "cyan");

    // X-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 40)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("");

    // Y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("");

    // Legend (moved below x-axis)
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width / 2 - 50},${height + 40})`); // Adjusted position

    // Legend for Product Demand
    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 6)
      .style("fill", "purple");

    legend
      .append("text")
      .attr("x", 10)
      .attr("y", 5)
      .text("Product Demand")
      .attr("fill", "white");

    // Legend for Selling Price (added space)
    legend
      .append("circle")
      .attr("cx", 150) // Increased distance from the first legend item
      .attr("cy", 0)
      .attr("r", 6)
      .style("fill", "cyan");

    legend
      .append("text")
      .attr("x", 160) // Aligned with the Selling Price circle
      .attr("y", 5)
      .text("Selling Price")
      .attr("fill", "white");
  }, []);

  return <div ref={chartRef}></div>;
};

export default LineChart;