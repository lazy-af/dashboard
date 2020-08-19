import React, { useRef, useState, useEffect } from 'react'
import D3BarChart from './D3BarChart';

const BarChartWrapper = () => {
    const chartArea = useRef();
    const [chart, setChart] = useState(null);
    useEffect(() => {
        if (!chart) {
            setChart(new D3BarChart(chartArea.current))
        } else {
            chart.update()
        }
    }, [chart])
    return (
        <div ref={chartArea}></div>
    )
}

export default BarChartWrapper
