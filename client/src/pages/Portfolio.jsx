import React, { useEffect, useState } from "react";
import Header2 from "../components/Header2";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import { MarketViewData } from "../data/dummy";
import PortfolioCard from "../components/PortfolioCard";
import { useStateContext } from "../context/ContextProvider";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Portfolio = () => {
  const { authFetch } = useAppContext();
  const [invested, setInvested] = useState(0);
  const [current, setCurrent] = useState(0);
  const [share, setShare] = useState([]);
  const [Portfolioshare, setPortfolioshare] = useState([]);
  const [user, setuser] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentColor } = useStateContext();
  const getShare = async () => {
    try {
      const share = await authFetch("share/getShare");
      setShare(share["data"]);
      const { data } = await authFetch("share/getUser");
      setuser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShare().then(() => {
      // console.log(1);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, []);
  useEffect(() => {
    let inv = 0;
    let cur = 0;
    setPortfolioshare([]);
    let arr = [];
    const d = new Date();
    let val = 0;
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    let day = d.getDate();
    val += hour * 60 * 60;
    val += min * 60;
    val += sec;
    for (let i = 0; i < share.length; i++) {
      let check = share[i];
      MarketViewData.filter(
        (item) => item.stockName === check["stockName"]
      ).map((item) => {
        inv += (check["quantity"] + 0) * (check["price"] + 0);
        const data = require(`../data/stockPrices/${item["key"]}`);
        let prices = data["price"];
        cur += check["quantity"] * prices[Math.floor(val / 3)];
        let obj = {
          quantity: check["quantity"],
          name: check["stockName"],
          buyPrice: check["price"],
          index: item["key"],
        };
        arr.push(obj);
      });
    }
    setPortfolioshare(arr);
    console.log(1);
    setInvested(inv.toFixed(2));
    setCurrent(cur.toFixed(2));
  }, [share, user]);
  const reloadFunc = () => {
    let cur = 0;
    const d = new Date();
    let val = 0;
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    let day = d.getDate();
    val += hour * 60 * 60;
    val += min * 60;
    val += sec;
    for (let i = 0; i < share.length; i++) {
      let check = share[i];
      MarketViewData.filter(
        (item) => item.stockName === check["stockName"]
      ).map((item) => {
        const data = require(`../data/stockPrices/${item["key"]}`);
        let prices = data["price"];
        cur += check["quantity"] * prices[Math.floor(val / 3)];
      });
    }
    setCurrent(cur.toFixed(2));
  };
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header2 title="Portfolio"></Header2>
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="w-full flex xl:flex-row flex-col justify-between px-0 text-center dark:text-white font-bold md:text-2xl text-lg  mb-10 text-black">
              <h1 className="">Wallet : {user["wallet"]}</h1>
              <h1>Invested : {invested}</h1>
              <h1 className="flex justify-center text-center">
                <button onClick={reloadFunc} className="px-1">
                  <HiOutlineRefresh color={currentColor} />
                </button>
                Current :
                <p
                  className="ml-1 flex justify-center text-center"
                  style={
                    invested - current <= 0
                      ? { color: "#00ff11" }
                      : { color: "#ff0d00" }
                  }
                >
                  {" "}
                  {current}{" "}
                  {invested > 0 ? (
                    <span className="text-base pt-1">
                      ({((current - invested) / invested).toFixed(3)}%)
                    </span>
                  ) : (
                    ""
                  )}
                  {invested - current <= 0 ? (
                    <AiOutlineArrowUp
                      className="inline -mt-1"
                      style={{ color: "#00ff11", fontSize: "20px" }}
                    />
                  ) : (
                    <AiOutlineArrowDown
                      style={{
                        color: "#ff0d00",
                        marginTop: "12px",
                        fontSize: "20px",
                      }}
                    />
                  )}
                </p>
              </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10 mx-1">
              {Portfolioshare.map((item) => {
                return (
                  <div style={{ width: "32rem" }} key={item.index}>
                    <PortfolioCard
                      stockname={item.name}
                      k={item.index}
                      quantity={item.quantity}
                      buyPrice={item.buyPrice}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="m-10 flex justify-center gap-8">
          <NavLink
            style={{
              backgroundColor: currentColor,
              borderRadius: "10px",
            }}
            to="/marketview"
            className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl `}
          >
            Trade
          </NavLink>
          <NavLink
            style={{
              backgroundColor: currentColor,
              borderRadius: "10px",
            }}
            to="/themepicker"
            className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl `}
          >
            Themes
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
