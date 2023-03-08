import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import Switch from "react-switch";
const BuySell = ({ pri, stockName }) => {
  const { authFetch, currentColor } = useAppContext();
  const [isAction, setisAction] = useState("Buy");
  const [Quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isDisplay, setIsDisplay] = useState(false);
  const [loading, setloading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  useEffect(async () => {
    const data = await authFetch("share/getUser");
    console.log(data);
    setCurrentBalance(data.data[0].balance);
  }, []);
  const handleSubmit = async () => {
    setloading(true);
    let price = pri;
    let quantity = Quantity;
    let ownerName = localStorage.getItem("name");
    try {
      await authFetch.post(`/share/${isAction}`, {
        ownerName,
        stockName,
        price,
        quantity,
      });
      const data = await authFetch("share/getUser");
      console.log(data);
      setCurrentBalance(data.data[0].balance);
      setMsg(`${isAction} Success`);
      setIsSuccess(true);
      setIsDisplay(true);
      setloading(false);
    } catch (error) {
      setMsg(error.response.data.msg);
      setIsSuccess(false);
      setIsDisplay(true);
      setloading(false);
    }
    setTimeout(() => {
      setIsDisplay(false);
    }, 2000);
  };
  return (
    <div className="xl:w-5/12 text-left flex flex-col justify-center mt-10 lg:p-10 p-2 gap-8 dark:text-white tracking-wide">
      <div className="flex flex-row justify-start items-left text-left">
        {loading && (
          <div className="w-full">
            <div className="m-auto w-2">
              <RingLoader
                size={"40px"}
                color={currentColor}
                className="-ml-5"
              />
            </div>
          </div>
        )}
        {isDisplay && !loading && (
          <p
            style={!isSuccess ? { color: "#ff0d00" } : { color: "#00ff11" }}
            className="md:text-xl text-base block font-medium tarcking-tight m-auto"
          >
            {msg}
          </p>
        )}
        {!isDisplay && !loading && (
          <p
            style={{ borderBottom: `2px solid ${currentColor}` }}
            className="md:text-xl text-base block font-medium tarcking-tight dark:text-white text-black lg:text-left m-auto lg:inline lg:m-0"
          >
            Current Balance: {currentBalance} &#8377;
          </p>
        )}
      </div>
      <div className="flex flex-row justify-start items-left text-center">
        <p className="w-1/2 md:text-xl text-base m-auto block font-medium tarcking-tight dark:text-white text-black text-left">
          Enter Quantity
        </p>
        <input
          value={Quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          className="w-1/2 lg:h-12 h-10 mx-auto  text-center border-1 border-solid border-black rounded-md text-black"
          min={"0"}
        ></input>
      </div>

      <div className="flex flex-row justify-around md:text-lg text-base font-medium">
        {isAction === "Buy" ? (
          <p className="text-left w-1/2 m-auto block">
            Brokerage : {Math.min((pri * Quantity * 0.0003).toFixed(2), 20)}
            &#8377;
          </p>
        ) : (
          <p className="text-left w-1/2 m-auto block">
            DP Charges : 15.93&#8377;
          </p>
        )}
        <div className="flex justify-between w-1/2 text-left font-normal">
          <div className="flex gap-4 justify-around dark:text-white text-left m-auto">
            <div className="flex flex-col h-12 items-center justify-center overflow-hidden">
              <div className="flex">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isAction == "Buy" ? true : false}
                    readOnly
                  />
                  <div
                    onClick={() =>
                      setisAction(isAction == "Buy" ? "Sell" : "Buy")
                    }
                    className="flex justify-around m-auto w-[102px] h-10 bg-red-500 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-12 after:transition-all peer-checked:bg-green-600 text-white"
                  >
                    <p className="m-auto">Buy</p>
                    <p className="m-auto">Sell</p>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around md:text-lg text-base font-medium">
        {isAction === "Buy" ? (
          <p className="text-left w-1/2 m-auto block">
            Total: {(pri * Quantity * 0.0003 + pri * Quantity).toFixed(2)}
            &#8377;
          </p>
        ) : (
          <p className="text-left w-1/2 m-auto block">
            Total: {(-15.93 + pri * Quantity).toFixed(2)}&#8377;
          </p>
        )}
        <button
          onClick={handleSubmit}
          style={{ background: currentColor }}
          className="items-center w-1/2 md:h-12 h-10 text-sm text-md text-center rounded-lg focus:outline-none font-bold text-white tracking-widest hover:border-2"
        >
          {isAction}
        </button>
      </div>
    </div>
  );
};

export default BuySell;
