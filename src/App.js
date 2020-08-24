import React from "react";
import "./App.css";
import BarChartWrapper from "./BarChartWrapper/BarChartWrapper";
import PieChartWrapper from "./PieChartWrapper/PieChartWrapper";
import LineChartWrapper from "./LineChartWraper/LineChartWrapper";
import StackBarChartWrapper from "./StackBarChartWrapper/StackBarChartWrapper";
import SunBurstChartWrapper from "./SunBurstChartWrapper/SunBurstChartWrapper";

const pieChartColorScheme = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

const stackChartColorScheme = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

function App() {
  return (
      <div className='chart-container'>
        <PieChartWrapper width={500} height={300} colorScheme={pieChartColorScheme} legend legendLength={0} />
        <BarChartWrapper width={500} height={300} />
        <LineChartWrapper width={500} height={300} />
        <StackBarChartWrapper width={500} height={300} colorScheme={stackChartColorScheme} legend legendLength={100}/>
        <SunBurstChartWrapper width={500} height={500} />
      </div>
  );
}

export default App;
