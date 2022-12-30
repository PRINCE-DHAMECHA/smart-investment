import React, { Children, createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setisClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("colorMode") || "#1E4DB7"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("themeMode") || "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeStockId, setactiveStockId] = useState(null);
  const [activeStockName, setactiveStockName] = useState(null);
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };
  const setStockId = (k, stockname) => {
    localStorage.setItem("stockId", k);
    localStorage.setItem("stockName", stockname);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };
  const handleClick = (clicked) => {
    setisClicked({ ...initialState, [clicked]: true });
  };
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setisClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
        activeStockId,
        setactiveStockId,
        setStockId,
        activeStockName,
        setactiveStockName,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
