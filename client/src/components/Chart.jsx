import React from "react";

const Chart = () => {
  return (
    <div className="w-1/2  rounded-lg block m-auto">
      <ChartComponent
        border={{ width: 0 }}
        background="#fafbfb"
        height="400"
        id="charts"
        zoomSettings={{
          enableMouseWheelZooming: true,
          enablePinchZooming: true,
          enableSelectionZooming: true,
        }}
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        title={`Today's Performance`}
        legendSettings={{ visible: true }}
        tooltip={{ enable: true }}
        margin={{ left: 5, right: 40, top: 30, bottom: 0 }}
      >
        <Inject
          services={[
            ColumnSeries,
            Legend,
            DataLabel,
            Tooltip,
            LineSeries,
            Category,
            Zoom,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={lineChartData}
            xName="x"
            yName="y"
            name={`${activeStockName} (${("0" + (d1.getDate() + 1)).slice(
              -2
            )}/${("0" + (d1.getMonth() + 1)).slice(-2)})`}
            width={2}
            marker={{
              visible: true,
              height: 5,
              width: 5,
              shape: "Diamond",
              fill: currentColor,
            }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Chart;
