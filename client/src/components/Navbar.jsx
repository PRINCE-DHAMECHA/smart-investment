import React, { useEffect } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../context/ContextProvider";
import { useAppContext } from "../context/appContext";
import { NavLink } from "react-router-dom";

const NavButton = ({ title, cunstomFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="bottomCenter">
    <button
      type="button"
      onClick={cunstomFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 "
    >
      <span
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        style={{ background: dotColor }}
      ></span>
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize, currentColor } =
    useStateContext();
  const { logoutUser } = useAppContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  let localStorage = window.localStorage.getItem("user");
  localStorage = localStorage.slice(1, localStorage.length - 1);
  const user = localStorage.split(",")[1].split(":")[1];
  const name = user.slice(1, user.length - 1);
  return (
    <div className="dark:bg-main-dark-bg">
      <div className="flex justify-between p-3 md:mx-6 relative">
        <NavButton
          cunstomFunc={() => {
            setActiveMenu((prev) => !prev);
          }}
          color={currentColor}
          icon={activeMenu ? "" : <AiOutlineMenu />}
        ></NavButton>

        <div className="flex">
          <div className="flex items-center flex-row gap-2 p-1  rounded-lg">
            <NavLink to="/portfolio" className="flex flex-row text-lg mr-1">
              <span className="text-black dark:text-white ">
                <AiOutlineUser size={"30px"} />
              </span>{" "}
              <span className="dark:text-white font-bold ml-1 ">{name}</span>
            </NavLink>
            <button
              style={{
                backgroundColor: currentColor,
                borderRadius: "10px",
              }}
              className={`text-lg text-white px-4 py-1 hover:drop-shadow-xl `}
              onClick={logoutUser}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
