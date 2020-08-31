import React, { useRef, useState, useEffect } from "react";
import D3PieChart from "./D3PieChart";
import "./PieChart.styles.scss";
import Axios from "axios";
import { json } from 'd3';
import { pieUtility } from "../../Utility/Utility";

const PieChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);
  let url = "";

  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return pieUtility(data);
      })
      .then((finalData) => {
        setData(finalData)
      }).catch(err => {
        console.log('error found: ', err);
        json('dummydata.json').then(data => {
          return pieUtility(data)
        }).then((finalData => setData(finalData)))
      });
  }, [url]);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3PieChart(
          chartArea.current,
          props.width,
          props.height,
          props.colorScheme,
          props.legend,
          props.legendLength
        )
      );
    } else {
      chart.update(data);
    }
  }, [
    chart,
    data,
    props.colorScheme,
    props.height,
    props.legend,
    props.legendLength,
    props.width,
  ]);

  return <div ref={chartArea}></div>;
};

export default PieChartWrapper;
