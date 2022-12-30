import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const MarketViewCard = ({ stockname, k, quantity, buyPrice }) => {
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
        (prices[Math.floor(val / 3)] - buyPrice).toFixed(2)
      );
      setPerChangeInPrice(
        (((prices[Math.floor(val / 3)] - buyPrice) / buyPrice) * 100).toFixed(2)
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
    (prices[Math.floor(val / 3)] - buyPrice).toFixed(2)
  );
  const [PerChangeInPrice, setPerChangeInPrice] = useState(
    (((prices[Math.floor(val / 3)] - buyPrice) / buyPrice) * 100).toFixed(2)
  );
  const { currentColor, currentMode, setStockId } = useStateContext();
  return (
    <div
      style={currentMode !== "Dark" ? { background: "rgb(250,251,251)" } : {}}
      className="rounded-lg border border-gray-100 cursor-pointer shadow-md dark:bg-gray-700 dark:border-gray-700 hover:border-y-2"
    >
      <div className="p-4">
        <div className="flex justify-between md:px-1 md:pt-2  m-auto">
          <div className="flex flex-row items-center justify-center">
            <span className="md:text-xl md:font font-semibold tracking-tight text-gray-900 dark:text-white">
              {stockname}
            </span>
            <div
              style={
                TotalchangeInPrice >= 0
                  ? { color: "#00ff11" }
                  : { color: "#ff0d00" }
              }
              className="hidden md:flex ml-2 text-sm lg:text-lg dark:text-white"
            >
              {PerChangeInPrice}%
            </div>
            {TotalchangeInPrice >= 0 ? (
              <AiOutlineArrowUp
                className="-mt-2 hidden md:flex"
                style={{ color: "#00ff11", fontSize: "20px" }}
              />
            ) : (
              <AiOutlineArrowDown
                className="hidden md:flex"
                style={{
                  color: "#ff0d00",
                  marginTop: "8px",
                  fontSize: "20px",
                }}
              />
            )}
          </div>
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
          <div className="flex lg:flex-row flex-col justify-end text-right">
            <div
              style={
                TotalchangeInPrice >= 0
                  ? { color: "#00ff11" }
                  : { color: "#ff0d00" }
              }
              className="md:hidden flex ml-2 justify-end text-sm lg:text-lg dark:text-white"
            >
              {PerChangeInPrice}%
              {TotalchangeInPrice >= 0 ? (
                <AiOutlineArrowUp
                  style={{ color: "#00ff11", fontSize: "15px" }}
                />
              ) : (
                <AiOutlineArrowDown
                  style={{
                    color: "#ff0d00",
                    fontSize: "15px",
                  }}
                />
              )}
            </div>
            <span className="lg:mb-5 md:text-base text-sm text-right  text-gray-900 dark:text-white">
              Avg : {buyPrice.toFixed(2)}
            </span>
            <div className="flex flex-row justify-end">
              <span className="lg:mb-5 text-right md:text-base text-sm  text-gray-900 dark:text-white">
                (q : {quantity})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketViewCard;
