import React, { useRef, useState, useEffect } from 'react'
import D3PieChart from './D3PieChart';
import './PieChartWrapper.css';

const data1 = [
    {
        label: "Lorem ipsum",
        value: 1
    },
    {
        label: "dolor sit",
        value: 1
    },
    {
        label: "amet",
        value: 1
    },
    {
        label: "consectetur",
        value: 1
    },
    {
        label: "adipisicing",
        value: 1
    },
    {
        label: "elit",
        value: 1
    },
    {
        label: "eiusmod",
        value: 1
    }
];

const data2 = [
    {
        label: "Lorem ipsum",
        value: 3
    },
    {
        label: "dolor sit",
        value: 4
    },
    {
        label: "amet",
        value: 1
    },
    {
        label: "consectetur",
        value: 7
    },
    {
        label: "adipisicing",
        value:4
    },
    {
        label: "elit",
        value: 6
    },
    {
        label: "eiusmod",
        value: 1
    }
];

const PieChartWrapper = (props) => {
    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);

    // temporary function
    const [data, setData] = useState(data1);
    const clickHandler = () => {
        if (data === data1) {
            setData(data2)
        } else {
            setData(data1)
        }
    }

    useEffect(() => {
        if (!chart) {
            setChart(new D3PieChart(chartArea.current, props.width, props.height, props.colorScheme, props.legend, props.legendLength))
        } else {
            chart.update(data)
        }
    }, [chart, data, props.colorScheme, props.height, props.legend, props.legendLength, props.width]);

    return (
        <div ref={chartArea}>
            <button onClick={clickHandler}>click</button>
        </div>
    )
}

export default PieChartWrapper;
