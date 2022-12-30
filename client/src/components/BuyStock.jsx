import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
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
} from "@syncfusion/ej2-react-charts";
import BuySell from "./BuySell";
let lineChartData = [];
const BuyStock = () => {
  const { currentColor } = useStateContext();
  const activeStockId = localStorage.getItem("stockId");
  const activeStockName = localStorage.getItem("stockName");
  const [isActive, setisActive] = useState(false);
  let d1 = new Date();
  let date = d1.getDate();
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
    title: "Time",
  };
  const primaryyAxis = {
    majorGridLines: {
      color: currentColor,
      width: 0.5,
    },
    title: "Price(₹)",
  };
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
          <div className="text-center w-full mt-2 flex flex-wrap justify-center">
            <BuySell pri={ltp} />
            <div className="w-full md:w-10/12 mt-10 block border-1 border-black border-solid rounded-xl ">
              <ChartComponent
                border={{ width: 0 }}
                background="#fafbfb"
                height="400"
                id="charts"
                primaryXAxis={primaryxAxis}
                primaryYAxis={primaryyAxis}
                title={`Today's Performance`}
                legendSettings={{ visible: true }}
                tooltip={{ enable: true }}
                margin={{ left: 10, right: 40, top: 30, bottom: 0 }}
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
                    name={`${activeStockName} (${("0" + d1.getDate()).slice(
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
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyStock;
