import React from "react";
import BarChartWrapper from "./Charts/BarChartWrapper/BarChartWrapper";
import PieChart from "./Charts/PieChartWrapper/index";
import LineChartWrapper from "./Charts/LineChartWraper/LineChartWrapper";
import StackBarChartWrapper from "./Charts/StackBarChartWrapper/StackBarChartWrapper";
import SunBurstChartWrapper from "./Charts/SunBurstChartWrapper/SunBurstChartWrapper";
import StackBarChart from "./Charts/HStackBarChartWrapper";
import KPITile from "./KPITile/KPITile";

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
      {/* <PieChart /> */}
      {/* <KPITile phase='development' img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png" /> */}
      {/* <KPITile phase='ideation' img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png" /> */}
      {/* <KPITile phase='production' img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png" /> */}
      {/* <KPITile phase='retired' img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png" /> */}
      {/* <BarChartWrapper width={500} height={300} /> */}
      {/* <LineChartWrapper width={500} height={300} /> */}
      {/* <StackBarChartWrapper width={500} height={300} colorScheme={stackChartColorScheme} legend legendLength={100}/> */}
      <SunBurstChartWrapper width={300} height={300} />
      {/* <StackBarChart /> */}
      
    </div>
  );
}

export default AppExtra;
