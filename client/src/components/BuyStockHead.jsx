import React from "react";

const BuyStockHead = ({ title, price, perChange, totChange }) => (
  <div className="w-full">
    <p className="md:text-3xl text-base  block font-extrabold tarcking-tight dark:text-white text-black">
      {title}
    </p>
    <div className="md:pl-4 pl-0">
      <p
        style={totChange >= 0 ? { color: "#00ff11" } : { color: "#ff0d00" }}
        className="mt-4 md:text-xl  text-md font-semibold dark:font-extralight tracking-wide "
      >
        {price}
      </p>
      <p className="md:text-md dark:text-slate-400  text-sm font-semibold dark:font-extralight tracking-wide ">
        {totChange >= 0 ? "+" : ""}
        {totChange} ( {totChange >= 0 ? "+" : ""}
        {perChange}% )
      </p>
    </div>
  </div>
);

export default BuyStockHead;
