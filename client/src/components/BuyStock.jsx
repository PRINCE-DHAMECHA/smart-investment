import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import BuyStockHead from "./BuyStockHead";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  Tooltip,
  ColumnSeries,
  Category,
  DataLabel,
  Zoom,
  Export,
} from "@syncfusion/ej2-react-charts";
import BuySell from "./BuySell";
import { TiExportOutline } from "react-icons/ti";
let lineChartData = [];
const BuyStock = () => {
  const { currentColor, currentMode } = useAppContext();
  const activeStockId = localStorage.getItem("stockId");
  const activeStockName = localStorage.getItem("stockName");
  const [isActive, setisActive] = useState(false);
  let d1 = new Date();
  const data = require(`../data/stockPrices/${activeStockId}`);
  let prices = data["price"];
  useEffect(() => {
    const timeInt = setInterval(() => {
      let val = 0;
      const d = new Date();
      let hour = d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();
      val += hour * 60 * 60;
      val += min * 60;
      val += sec;
      setltp(prices[Math.floor(val / 3)]);
      setTotalchangeInPrice(
        (prices[Math.floor(val / 3)] - prices[0]).toFixed(2)
      );
      setPerChangeInPrice(
        (((prices[Math.floor(val / 3)] - prices[0]) / prices[0]) * 100).toFixed(
          2
        )
      );
    }, 3000);
    lineChartData = [];
    let tempHour = 0;
    for (let i = 0; i <= hour; i++) {
      lineChartData.push({
        x: `${("0" + tempHour).slice(-2)}:00`,
        y: prices[(i * 60 * 60) / 3],
      });
      tempHour++;
    }
    setisActive(true);
    return () => {
      clearInterval(timeInt);
    };
  }, []);

  let val = 0;
  const d = new Date();
  let hour = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  val += hour * 60 * 60;
  val += min * 60;
  val += sec;
  const [ltp, setltp] = useState(prices[Math.floor(val / 3)]);
  const [TotalchangeInPrice, setTotalchangeInPrice] = useState(
    (prices[Math.floor(val / 3)] - prices[0]).toFixed(2)
  );
  const [PerChangeInPrice, setPerChangeInPrice] = useState(
    (((prices[Math.floor(val / 3)] - prices[0]) / prices[0]) * 100).toFixed(2)
  );
  const primaryxAxis = {
    valueType: "Category",
    labelPlacement: "OnTicks",
    majorGridLines: {
      color: currentColor,
      width: 0,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  const primaryyAxis = {
    majorGridLines: {
      color: currentColor,
      width: 0.1,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  let chartInstance;
  function clickHandler() {
    chartInstance.exportModule.export(
      "PNG",
      `${activeStockName} (${("0" + d1.getDate()).slice(-2)}/${(
        "0" +
        (d1.getMonth() + 1)
      ).slice(-2)})`
    );
  }
  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-6 md:p-10 dark:bg-secondary-dark-bg bg-white rounded-3xl">
        <div className="flex justify-between flex-wrap">
          <div className="w-1/2">
            <BuyStockHead
              chartArea={{ border: { width: 10 } }}
              title={activeStockName}
              price={ltp}
              perChange={PerChangeInPrice}
              totChange={TotalchangeInPrice}
            />
          </div>
          <Link
            to="/marketView"
            style={{ background: currentColor }}
            className="flex items-center md:h-16 h-10  md:px-4 md:py-2 px-2 text-sm text-md text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold text-white tracking-widest hover:border-2"
          >
            MarketView
          </Link>
        </div>
        {isActive && (
          <div className="text-center w-full mt-2 flex flex-wrap flex-col xl:flex-row justify-center gap-2">
            <BuySell pri={ltp} />
            <div className="w-full xl:w-6/12 dark:text-white mt-10 block  rounded-xl text-left">
              <p className="m-auto md:text-2xl text-lg text-center">
                Price Chart:
                {`  ${activeStockName} (${("0" + d1.getDate()).slice(-2)}/${(
                  "0" +
                  (d1.getMonth() + 1)
                ).slice(-2)})`}
                <button
                  className="pl-2"
                  value="print"
                  onClick={clickHandler.bind(this)}
                >
                  <TiExportOutline
                    fontSize={"20px"}
                    color={`${currentColor}`}
                  />
                </button>
              </p>
              <ChartComponent
                border={{ width: 0 }}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background="none"
                height="400"
                id="charts"
                primaryXAxis={primaryxAxis}
                primaryYAxis={primaryyAxis}
                legendSettings={{ visible: true }}
                margin={{ top: 30, bottom: 0 }}
                ref={(chart) => (chartInstance = chart)}
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
                    Export,
                  ]}
                />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={lineChartData}
                    xName="x"
                    yName="y"
                    width={2}
                    marker={{
                      visible: true,
                      height: 5,
                      width: 5,
                      shape: "Diamond",
                      fill: currentColor,
                    }}
                    // fill={currentMode === "Dark" ? "white" : "black"}
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyStock;
