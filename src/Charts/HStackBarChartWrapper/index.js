import HStackBarChartWrapper from './HStackBarChart.wrapper';
import React from 'react';
const stackBarChartColorScheme = ["lightgreen", "lightblue", "pink", "orange"];

const StackBarChart = () => {
    return <HStackBarChartWrapper  
    width={400} 
    height={300} //200 for nawaz dashboard
    xAxisLabel="X-Axis Label -->"
    legend 
    legendWidth={100}
    colorScheme={stackBarChartColorScheme} />
}

export default StackBarChart;