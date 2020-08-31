import React from "react";
import BarChartWrapper from "./Charts/BarChartWrapper/BarChartWrapper";
import PieChart from "./Charts/PieChartWrapper/index";
import LineChartWrapper from "./Charts/LineChartWraper/LineChartWrapper";
import StackBarChartWrapper from "./Charts/StackBarChartWrapper/StackBarChartWrapper";
import SunBurstChartWrapper from "./Charts/SunBurstChartWrapper/SunBurstChartWrapper";
import HStackBarChartWrapper from "./Charts/HStackBarChartWrapper/HStackBarChartWrapper";

const stackChartColorScheme = [
  "#98abc5",
  "#8a89a6",
  "#7b6888",
  "#6b486b",
  "#a05d56",
  "#d0743c",
  "#ff8c00",
];

function AppExtra() {
  return (
    <div className="chart-container">
      <PieChart />
      {/* <BarChartWrapper width={500} height={300} /> */}
      {/* <LineChartWrapper width={500} height={300} /> */}
      {/* <StackBarChartWrapper width={500} height={300} colorScheme={stackChartColorScheme} legend legendLength={100}/> */}
      {/* <SunBurstChartWrapper width={500} height={500} /> */}
      {/* <HStackBarChartWrapper /> */}
    </div>
  );
}

export default AppExtra;
