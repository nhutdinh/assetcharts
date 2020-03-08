import React from "react";
import ReactDOM from "react-dom";
import Chart from "./Chart";
import { ChartStyled } from "./Slider.styled";

const App = (): React.ReactElement => {
  return (
    // <ChartStyled>
    <Chart></Chart>
    // </ChartStyled>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
