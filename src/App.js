import React from "react";
import "./App.css";
import BarChartWrapper from "./BarChartWrapper/BarChartWrapper";
import { Container } from "react-bootstrap";
import PieChartWrapper from "./PieChartWrapper/PieChartWrapper";

function App() {
  return (
    <Container>
      <div>
        <h1>Hello</h1>
        <BarChartWrapper />
        <PieChartWrapper />
      </div>
    </Container>
  );
}

export default App;
