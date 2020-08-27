import React, { useRef, useState, useEffect } from "react";
import D3PieChart from "./D3PieChart";
import "./PieChartWrapper.css";
import Axios from "axios";

const PieChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);
  let url = "https://dashboard-8836f.firebaseio.com/data.json";

  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        let development = 0;
        let ideation = 0;
        let production = 0;
        let retired = 0;
        data.map((d) => {
          if (d.phase === "Development") {
            development++;
          } else if (d.phase === "Ideation") {
            ideation++;
          } else if (d.phase === "Production") {
            production++;
          } else if (d.phase === "Retired") {
            retired++;
          } else {
            return null;
          }
        });
        return [
          { label: "Development", value: development },
          { label: "Ideation", value: ideation },
          { label: "Production", value: production },
          { label: "Retired", value: retired },
        ];
      })
      .then((finalData) => setData(finalData));
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
