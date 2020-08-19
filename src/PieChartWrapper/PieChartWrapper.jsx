import React, { useRef, useState, useEffect } from 'react'
import D3PieChart from './D3PieChart';


const PieChartWrapper = () => {
    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);
    useEffect(() => {
        if (!chart) {
            setChart(new D3PieChart(chartArea.current))
        } else {
            chart.update()
        }
    }, [chart]);

    return (
        <div ref={chartArea}></div>
    )
}

export default PieChartWrapper;
