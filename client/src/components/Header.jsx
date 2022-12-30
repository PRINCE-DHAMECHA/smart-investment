import React from "react";
import { useStateContext } from "../context/ContextProvider";

const Header = ({ title }) => {
  const { setColor, currentColor } = useStateContext();
  return (
    <div className="mb-10 mt-5 text-center">
      <p
        style={{ borderColor: currentColor }}
        className="lg:text-3xl text-2xl m-auto pb-2 font-extrabold tarcking-tight border-solid border-b-2 border-black lg:w-1/5 w-5/12 text-black"
      >
        {title}
      </p>
    </div>
  );
};

export default Header;
