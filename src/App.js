import React from "react";
import "./App.css";
import BarChartWrapper from "./BarChartWrapper/BarChartWrapper";
import PieChartWrapper from "./PieChartWrapper/PieChartWrapper";



function App() {
  return (
    
      <div className='chart-container'>
        <PieChartWrapper />
        <BarChartWrapper />
      </div>
  );
}

export default App;
