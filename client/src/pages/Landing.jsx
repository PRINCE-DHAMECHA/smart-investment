import React from "react";
import logoLight from "../utils/img/logolight.jpg";
import logoDark from "../utils/img/logodark.jpg";
import { useStateContext } from "../context/ContextProvider";
import { quotes } from "../data/dummy";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import SetTheme from "../components/SetTheme";
import Fader from "../components/Fader";

const Landing = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="dark:bg-secondary-dark-bg h-screen">
        <div>
          <div className="h-40 p-5 md:ml-9  ml-4 flex">
            <div className="mt-10">
              <img
                alt="logo"
                className="w-full h-full"
                src={currentMode === "Dark" ? logoDark : logoLight}
              ></img>
            </div>
          </div>
        </div>
        <SetTheme />
        <div className="text-center m-auto mt-32 md:w-1/2 w-3/4 text-xl sm:text-2xl font-semibold dark:text-white">
          <Fader text={quotes[0]}></Fader>
        </div>
        <div style={{ top: "70%" }} className="fixed w-full text-center m-auto">
          <Link to="/register" className="btn btn-hero">
            <Button
              color="white"
              bgColor={currentColor}
              text="Start Investing"
              borderRadius="10px"
              size="md"
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
