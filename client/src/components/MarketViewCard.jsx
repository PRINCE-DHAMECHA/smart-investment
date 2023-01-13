import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const MarketViewCard = ({ stockname, k }) => {
  const id = k;
  const date = new Date();
  const day = date.getDate();
  let prices;
  const data = require(`../data/stockPrices/${k}`);
  prices = data["price"];
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
  const { currentColor, currentMode, setStockId } = useStateContext();
  return (
    <div
      style={currentMode !== "Dark" ? { background: "rgb(250,251,251)" } : {}}
      className="rounded-lg border border-gray-100 cursor-pointer shadow-md dark:bg-gray-700 dark:border-gray-700 hover:border-y-2"
    >
      <div className="md:p-5 p-3">
        <div className="flex justify-between md:px-1 m-auto">
          <span className="md:text-xl md:font font-semibold tracking-tight text-gray-900 dark:text-white">
            {stockname}
          </span>
          <p
            style={
              TotalchangeInPrice >= 0
                ? { color: "#00ff11" }
                : { color: "#ff0d00" }
            }
            className="md:text-2xl  text-xl font-normal tracking-wide "
          >
            {ltp}
          </p>
        </div>
        <div className="flex justify-between text-center">
          <Link
            to="/buyStock"
            onClick={() => setStockId(id, stockname)}
            style={
              TotalchangeInPrice >= 0
                ? { background: currentColor, borderColor: "#00cb0e" }
                : { background: currentColor, borderColor: "#ff0d00" }
            }
            className="flex items-center md:mt-4 mt-4 md:py-2 px-4 py-2 md:px-4 text-sm text-md text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 text-white font-light tracking-widest hover:border-2"
          >
            Buy / Sell
          </Link>
          <span className="mb-5 pr-1 md:text-base text-sm  text-gray-900 dark:text-white">
            {TotalchangeInPrice >= 0 ? "+" : ""}
            {TotalchangeInPrice} ( {TotalchangeInPrice >= 0 ? "+" : ""}
            {PerChangeInPrice}% )
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketViewCard;