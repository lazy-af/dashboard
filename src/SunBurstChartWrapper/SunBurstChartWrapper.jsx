import React, { useRef, useState, useEffect } from 'react'
import D3SunBurstChart from './D3SunBurstChart';

const SunBurstChartWrapper = (props) => {
    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (!chart) {
            setChart(new D3SunBurstChart(chartArea.current, props.width, props.height))
        } else {
            chart.update();
        }
    }, [chart, props.height, props.width])
    return (
    <div id="main">
      <div id="sequence"></div>
      <div ref={chartArea} id='chart'>
        <div id="explanation" style={{visibility: "hidden"}}>
          <span id="percentage"></span><br/>
          of visits begin with this sequence of pages
        </div>
      </div>
    </div>
        
    )
}

export default SunBurstChartWrapper
