import React, { useRef, useState, useEffect } from 'react';
import D3HStackBarChart from './D3HStackBarChart';
import * as d3 from 'd3';

const HStackBarChartWrapper = (props) => {

    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);
    const [dataChnage, setdataChnage] = useState(true);

    const clickHandler = () => {
        setdataChnage(prevValue => !prevValue)
    }

    useEffect(() => {
        if (!chart) {
            setChart(new D3HStackBarChart(chartArea.current))
        } else {
            if (dataChnage) {
                d3.csv("datastack.csv").then(response => chart.update(response));
            } else {
                d3.csv("datastack2.csv").then(response => chart.update(response));
            }
        }
    }, [chart, dataChnage])


    return <div ref={chartArea}>
        <button onClick={clickHandler}>click</button>
    </div>
}

export default HStackBarChartWrapper;
