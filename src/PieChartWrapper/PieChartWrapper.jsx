import React, { useRef, useState, useEffect } from 'react'
import D3PieChart from './D3PieChart';

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
        label: "sed",
        value: 1
    },
    {
        label: "do",
        value: 1
    },
    {
        label: "eiusmod",
        value: 1
    },
    {
        label: "tempor",
        value: 1
    },
    {
        label: "incididunt",
        value: 1
    }
];

const data2 = [
    {
        label: "Lorem ipsum",
        value: Math.random() * 10
    },
    {
        label: "dolor sit",
        value: Math.random() * 10
    },
    {
        label: "amet",
        value: Math.random() * 10
    },
    {
        label: "consectetur",
        value: Math.random() * 10
    },
    {
        label: "adipisicing",
        value: Math.random() * 10
    },
    {
        label: "elit",
        value: Math.random() * 10
    },
    {
        label: "sed",
        value: Math.random() * 10
    },
    {
        label: "do",
        value: Math.random() * 10
    },
    {
        label: "eiusmod",
        value: Math.random() * 10
    },
    {
        label: "tempor",
        value: Math.random() * 10
    },
    {
        label: "incididunt",
        value: Math.random() * 10
    }
];

const PieChartWrapper = () => {
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
            setChart(new D3PieChart(chartArea.current))
        } else {
            chart.update(data)
        }
    }, [chart, data]);

    return (
        <div ref={chartArea}>
            <button onClick={clickHandler}>click</button>
        </div>
    )
}

export default PieChartWrapper;
