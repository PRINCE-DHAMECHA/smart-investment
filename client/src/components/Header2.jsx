import React from "react";
import { useStateContext } from "../context/ContextProvider";

const Header2 = ({ category, title }) => {
  const { setColor, currentColor } = useStateContext();
  return (
    <div className="mb-10 mt-5 w-full text-center">
      <p
        style={{ borderColor: currentColor }}
        className="lg:text-3xl text-2xl m-auto pb-2 font-extrabold tarcking-tight dark:text-white text-black border-solid border-b-2 lg:w-1/6 w-1/3"
      >
        {title}
      </p>
    </div>
  );
};

export default Header2;
