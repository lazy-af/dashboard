import React, { useRef, useState, useEffect } from "react";
import D3MultiLineChart from "./D3MultiLineChart";
import "./MultiLineChart.css";
import * as d3 from "d3";

const MultiLineChart = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  const [dataswitch, setDataswitch] = useState(true);

  // temporary function
  const dataChangeHandler = () => {
    setDataswitch((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3MultiLineChart(chartArea.current, props.width, props.height)
      );
    } else {
      if (dataswitch) {
        d3.json("dataLine1.json").then((response) => chart.update(response));
      } else {
        d3.json("dataLine2.json").then((response) => chart.update(response));
      }
    }
    return () => {
      document.querySelectorAll(".line1").forEach((e) => e.remove());
      document.querySelectorAll(".line2").forEach((e) => e.remove());
    };
  }, [chart, dataswitch, props.height, props.width]);
  return (
    <div ref={chartArea}>
      <button onClick={dataChangeHandler}>click</button>
    </div>
  );
};

export default MultiLineChart;
