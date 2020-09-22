import React, { useRef, useState, useEffect } from "react";
import D3HStackBarChart from "./D3HStackBarChart";
import Axios from "axios";
import { stackBarUtility2, stackBarUtility1 } from "../../Utility/Utility";
import { json } from "d3";

const HStackBarChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [dataChnage, setdataChnage] = useState(true);
  const [data, setData] = useState([]);
  let url = "https://dashboard-8836f.firebaseio.com/data.json";

  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const allCapablities = data.map((d) => d.capabilities);
        const capability = allCapablities.filter(
          (d, i) => allCapablities.indexOf(d) === i
        );
        console.log("capa:", capability);
        stackBarUtility1(data);
        console.log("stackutil1:", stackBarUtility1(data));
        console.log("stackutil2:", stackBarUtility2(capability));
        return stackBarUtility2(capability);
      })
      .then((finalData) => {
        setData(finalData);
      })
      .catch((err) => {
        console.log("error Found:", err);
        json(dataChnage ? "dummydata.json" : "dummydata2.json")
          .then((data) => {
            const allCapablities = data.map((d) => d.capabilities);
            const capability = allCapablities.filter(
              (d, i) => allCapablities.indexOf(d) === i
            );
            stackBarUtility1(data);
            return stackBarUtility2(capability);
          })
          .then((finalData) => {
            console.log(finalData);
            setData(finalData);
          });
      });
  }, [url, dataChnage]);

  const clickHandler = () => {
    setdataChnage((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3HStackBarChart(
          chartArea.current,
          props.width,
          props.height,
          props.legend,
          props.legendWidth,
          props.colorScheme,
          props.xAxisLabel
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
    props.legendWidth,
    props.width,
    props.xAxisLabel,
  ]);

  return (
    <div ref={chartArea}>
      <button onClick={clickHandler}>click</button>
    </div>
  );
};

export default HStackBarChartWrapper;
{
  /* <button onClick={clickHandler}>click</button> */
}
