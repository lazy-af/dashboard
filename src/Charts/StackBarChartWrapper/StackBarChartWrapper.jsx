import React, { useRef, useState, useEffect } from 'react';
import D3StackBarChart from './D3StackBarChart';
import * as d3 from 'd3';
const StackBarChartWrapper = (props) => {
    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);
    const [dataChnage, setdataChnage] = useState(true);

    const clickHandler = () => {
        setdataChnage(prevValue => !prevValue)
    }

    useEffect(() => {
        if (!chart) {
            setChart(new D3StackBarChart(chartArea.current, props.width, props.height, props.colorScheme, props.legend, props.legendLength))
        } else {
            if (dataChnage) {
                d3.csv("datastack.csv").then(response => chart.update(response));
            } else {
                d3.csv("datastack2.csv").then(response => chart.update(response));
            }
            
        }
    }, [chart, dataChnage, props.colorScheme, props.height, props.legend, props.legendLength, props.width])
    return (
        <div ref={chartArea}>
            <button onClick={clickHandler}>click</button>
        </div>
    )
}

export default StackBarChartWrapper;
