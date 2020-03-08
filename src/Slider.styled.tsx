import styled from "styled-components";

export const ChartStyled = styled.div<{ hoveredColumn: number }>`
  .highcharts-scrolling::-webkit-scrollbar {
    display: none;
  }

  .hovered {
    rect {
      &.highcharts-point-hover {
        width: 8px;
        transform: translateX(-1px);
      }
    }
  }

  /* Hide scrollbar for IE and Edge */
  .highcharts-scrolling {
    -ms-overflow-style: none;
  }
  // .highcharts-point-hover {
  //   width: 18px;
  //   transition: width linear 1s;
  //   x: 330;
  // }
`;
