import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ScrollBooster from "scrollbooster";
import { ChartStyled } from "./Slider.styled";
const Chart: React.FC<{}> = (): React.ReactElement => {
  const [hoveredCollumn, setHoverCollumn] = React.useState();
  function findTick(x: number, ticks: any, range: number) {
    // console.log(x);
    for (const tickValue in ticks) {
      if (Math.abs(x - +tickValue) <= range) {
        return ticks[tickValue];
      }
    }
  }
  let dragging: boolean = false;
  let mousedown: boolean = false;
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      scrollablePlotArea: { minWidth: 1200 },
      events: {
        load() {
          var catLen = this.xAxis[0].categories.length - 1;
          // this.xAxis[0].setExtremes(60, catLen);
          console.log(this);
          // this.series[0].points[4].onMouseOver(); // comment this line if you want to uncomment below point definition
          setTimeout(function() {
            new ScrollBooster({
              viewport: document.querySelector(".highcharts-scrolling"),
              scrollMode: "native",
              direction: "horizontal",
              onClick: function() {
                // dragging = true;
                // console.log("click");
              },
              onUpdate: function() {
                // dragging = true;
                // console.log("update");
              }
            });
            // const scrollElmt = document.querySelector(".highcharts-scrolling");

            // scrollElmt.addEventListener("mousedown", function() {
            //   console.log("down");
            //   mousedown = true;
            // });
            // scrollElmt.addEventListener("mousemove", function() {
            //   // console.log("down");
            //   if (mousedown) dragging = true;
            // });

            // scrollElmt.addEventListener("mouseup", function() {
            //   console.log("up");
            //   dragging = false;
            //   mousedown = false;
            // });
          }, 0);
        }
      }
    },
    title: {
      text: "Stacked column chart"
    },
    xAxis: {
      categories: ["10", "20", "30", "40", "50"],
      // tickLength: 10,
      // tickInterval: 5,
      labels: {
        useHTML: true,
        formatter: function() {
          // console.log(this.value);
          return `<div id="x-${
            this.value
          }"><div style="padding-bottom: 10px; display: block">abc </div><div>${
            this.value == 10 ? "def" : this.value
          }</div></div>`;
          // return `<div>${this.value}</div>` + `<div>${this.value === 10 : "abc" : ""}</div>`;
        }
      },
      crosshair: {
        color: "red",
        dashStyle: "Solid",
        width: 1
        // zIndex: 100
      }
    },

    yAxis: {
      min: 0,
      // width: 6,
      title: {
        text: "Total fruit consumption"
      }

      // stackLabels: {
      //   enabled: true,
      //   style: {
      //     fontWeight: "bold",
      //     color:
      //       // theme
      //       (Highcharts.defaultOptions.title.style &&
      //         Highcharts.defaultOptions.title.style.color) ||
      //       "gray"
      //   }
      // }
    },

    tooltip: {
      shared: true,

      // enabled: false,
      formatter: () => null,
      borderColor: "transparent",
      backgroundColor: "transparent",
      style: { display: "none" }
    },
    plotOptions: {
      column: {
        selected: true,
        stacking: "normal",
        pointWidth: 6,
        events: {
          click: function() {
            console.log("hsclick");
          },
          mouseOver: function() {
            // console.log(this);
            // this.update({ type: "column", pointWidth: 8 });
            const newOptions = { pointWidth: 8 };

            const items = this.chart.series.map(item => item.data[this.index]);
            // console.log(items);
            // items.forEach(it => it.update(newOptions));
          },
          mouseOut: function() {
            // console.log("out");
            // const items = this.chart.series.map(item => item.data[this.index]);
            // items.forEach(it => it.update({ pointWidth: 6 }));
          }
        }
      },
      series: {
        point: {
          events: {
            mouseOver: function(e) {
              setHoverCollumn(this.index);
              return;
              // console.log(dragging);
              // if (dragging) return;
              // console.log(e.target.x, e.target.distX);
              const newOptions = { pointWidth: 8, opacity: 1 };
              // console.log(this);
              // this.update(newOptions);
              // this.series.chart.series[1].data[1].update({
              //   ...newOptions
              // });
              // this.series.chart.series[1].data[2].update({
              //   ...newOptions
              // });
              // if (Math.abs(e.currentTarget - +tickValue) <= range) {
              //   return ticks[tickValue];
              // }
              const newItems = this.series.chart.series.map(item => {
                // console.log(item.index, this.index);
                return item.data.filter(it => it.index !== this.index);
              });
              // .map(item => item.data[this.index]);
              // console.log(newItems);
              const items = this.series.chart.series.map(
                item => item.data[this.index]
              );

              // const newItems = this.series.chart.series.map(
              //   item => item.index !== this.index && item.data[this.index]
              // );
              // console.log(newItems);
              items.forEach(it => {
                // console.log(it && it.index);
                // it && it.index == this.index && it.update(newOptions);
                // it && it.index != this.index && it.update({ opacity: 0.1 });
              });

              newItems.forEach(it => {
                // console.log(it && it.index);
                // it && it.forEach(it2 => it2.update({ opacity: 0.1 }));
                // it && it.index != this.index && it.update({ opacity: 0.1 });
              });
              // console.log(items);
              // console.log(this.series.chart.hoverSeries);
              // console.log(this);
              var tick = findTick(this.x, this.series.xAxis.ticks, 0);
              // console.log(tick);
              this.selectedTick = tick;

              if (tick) {
                tick.label.css({
                  color: "#FF0000"
                });
              }
            },
            mouseOut: function(e) {
              return;
              // setHoverCollumn(1000);
              // console.log("mouseOUt");
              // console.log(this);
              const items = this.series.chart.series.map(
                item => item.data[this.index]
              );
              // console.log(items);
              // items.forEach(it => it && it.update({ pointWidth: 6 }));
              if (this.selectedTick) {
                this.selectedTick.label.css({
                  color: "#565f76"
                });
                this.selectedTick = null;
              }
            }
          }
        }
      }
    },
    series: [
      {
        type: "column",
        name: "John",
        data: [5, 3, 4, 7, 2]
      },
      {
        type: "column",
        name: "Jane",
        data: [2, 2, 3, 2, 1]
      },
      {
        type: "column",
        name: "Joe",
        data: [3, 4, 4, 2, 5]
      },
      {
        type: "spline",
        name: "Average",
        data: [10, 18, 3, 6.33, 3.33],
        marker: {
          enabled: false,
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white"
        }
      }
      // {
      //   type: "spline",
      //   name: "Average",
      //   data: [13, 18],
      //   marker: {
      //     lineWidth: 2,
      //     enabled: false,
      //     lineColor: Highcharts.getOptions().colors[3],
      //     fillColor: "red"
      //   }
      // }
    ]
  };
  return (
    <ChartStyled
      hoveredColumn={hoveredCollumn}
      style={{ width: "auto", overflow: "sroll" }}
    >
      <div className={`hovered`} style={{ width: "auto" }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </ChartStyled>
  );
};

export default Chart;
