import React, { useReducer, useContext, useState } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  shares: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  const [activeLoan, setActiveLoan] = useState(null);
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };
  const setStockId = (k, stockname) => {
    localStorage.setItem("stockId", k);
    localStorage.setItem("stockName", stockname);
  };
  const setLoan = (data, outstanding, date) => {
    localStorage.setItem("lender", data.lender);
    localStorage.setItem("principal", data.principal);
    localStorage.setItem("interest", data.interest);
    localStorage.setItem("id", data._id);
    localStorage.setItem("outstanding", outstanding);
    localStorage.setItem("date", date);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };
  const handleClick = (clicked) => {
    setisClicked({ ...initialState, [clicked]: true });
  };

  const maxMin = [
    { name: "Prince Airlines", max: "1252.59", min: "1131.46" },
    { name: "Krishna Zoo", max: "634.13", min: "591.39" },
    { name: "Kanan Ielts", max: "2750.2", min: "2537.74" },
    { name: "Adarsh Gaming", max: "6188.36", min: "5805.23" },
    { name: "Namra Pharma", max: "2533.88", min: "2358.07" },
    { name: "Aditya Studio", max: "469.73", min: "433.43" },
    { name: "Parshwa Electronics", max: "1602.38", min: "1472.51" },
    { name: "Darshana Music", max: "5210.58", min: "4930.96" },
    { name: "Khushali Ice-Cream", max: "101.66", min: "93.11" },
    { name: "Honey Dresses", max: "10369.66", min: "9592.86" },
  ];

  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:5000/",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("name", user.name);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const getShares = async () => {
    try {
      const share = await authFetch("share/getShare");
      initialState.shares = share["data"];
    } catch (error) {}
    clearAlert();
  };
  const getUser = async () => {
    try {
      const { data } = await authFetch("share/getUser");
      return data;
    } catch (error) {}
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        getShares,
        getUser,
        authFetch,
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
        activeLoan,
        setActiveLoan,
        setLoan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
