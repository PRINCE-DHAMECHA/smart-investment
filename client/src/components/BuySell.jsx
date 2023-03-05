import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import Switch from "react-switch";
const BuySell = ({ pri }) => {
  const { authFetch, currentColor } = useAppContext();
  const [isAction, setisAction] = useState("Buy");
  const [Quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isDisplay, setIsDisplay] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true);
    let price = pri;
    let quantity = Quantity;
    let stockName = localStorage.getItem("stockName");
    let ownerName = localStorage.getItem("name");
    try {
      await authFetch.post(`/share/${isAction}`, {
        ownerName,
        stockName,
        price,
        quantity,
      });
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
  };
  return (
    <div className="w-96 text-center flex flex-col justify-start">
      {isDisplay && !loading && (
        <p
          style={!isSuccess ? { color: "#ff0d00" } : { color: "#00ff11" }}
          className="mt-5 mb-8 font-bold text-lg"
        >
          {msg}
        </p>
      )}
      {loading && (
        <div className="w-full pb-10">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      )}
      <div className="w-full flex m-auto justify-between text-center">
        <p className="w-2/3 md:text-xl text-base m-auto -ml-8 block font-extrabold tarcking-tight dark:text-white text-black">
          Enter Quantity
        </p>
        <input
          value={Quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          className="w-2/3 h-8 mx-auto  text-center border-1 border-solid border-black rounded-md"
          min={"0"}
        ></input>
      </div>
      <div className="flex my-5 justify-between">
        <div className="flex gap-4 justify-around dark:text-white m-auto">
          {/* <label>{isAction}</label> */}
          {/* <Switch
            offColor="#ff0000"
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => setisAction(isAction == "Buy" ? "Sell" : "Buy")}
            checked={isAction == "Buy" ? true : false}
          /> */}
          <div className="flex flex-col h-24 items-center justify-center overflow-hidden">
            <div className="flex">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
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
                  className="flex justify-around m-auto w-[102px] h-10 bg-red-600 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-12 after:transition-all peer-checked:bg-green-600 text-white"
                >
                  <p className="m-auto">Buy</p>
                  <p className="m-auto">Sell</p>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900"></span>
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          style={{ background: currentColor }}
          className="items-center w-1/3 m-auto mr-8 md:h-12 h-10 text-sm text-md text-center rounded-lg focus:outline-none font-bold text-white tracking-widest hover:border-2"
        >
          {isAction}
        </button>
      </div>
    </div>
  );
};

export default BuySell;
