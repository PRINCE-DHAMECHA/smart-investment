import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
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
        ></input>
      </div>
      <div className="flex my-5 justify-between">
        <select
          value={isAction}
          onChange={(e) => setisAction(e.target.value)}
          className="w-1/3 md:h-12 h-10 m-auto ml-4 text-center border-1 border-solid border-black rounded-md"
        >
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <button
          onClick={handleSubmit}
          style={{ background: currentColor }}
          className="items-center w-1/3 m-auto mr-3 md:h-12 h-10 text-sm text-md text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold text-white tracking-widest hover:border-2"
        >
          {isAction}
        </button>
      </div>
    </div>
  );
};

export default BuySell;
