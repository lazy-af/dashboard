import React, { useRef, useState, useEffect } from 'react';
import D3LineChart from './D3LineChart';
import './LineChartWrapper.css';
import * as d3 from 'd3';

const LineChartWrapper = (props) => {
    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);
    const [dataswitch, setDataswitch] = useState(true);

    // temporary function
    const dataChangeHandler = () => {
        setDataswitch(prevValue => !prevValue);
    }

    useEffect(() => {
        if (!chart) {
            setChart(new D3LineChart(chartArea.current, props.width, props.height))
        } else {
            if (dataswitch) {
                d3.json("dataLine1.json").then(response => chart.update(response));
            } else {
                d3.json("dataLine2.json").then(response => chart.update(response));
            }
            
            
        }
    }, [chart, dataswitch, props.height, props.width])

    
    return (
        <div ref={chartArea}>
            <button onClick={dataChangeHandler}>click</button>
        </div>
    )
}

export default LineChartWrapper;
