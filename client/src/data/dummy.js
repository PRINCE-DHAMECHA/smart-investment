import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Portfolio",
        icon: <CgProfile />,
      },
      {
        name: "MarketView",
        icon: <AiOutlineBarChart />,
      },
      {
        name: "ThemePicker",
        icon: <FiEdit />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const quotes = [
  '"The biggest risk of all is not taking one."',
  '"Returns matter a lot. It\'s our capital."',
  '"It\'s not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for."',
  '"Know what you own, and know why you own it." ',
  "\"Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. You can't win until you do this.\"",
  '"Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas."',
];

export const MarketViewData = [
  {
    stockName: "Prince Airlines",
    key: 1,
  },
  {
    stockName: "Krishna Zoo",
    key: 2,
  },
  {
    stockName: "Kanan Ielts",
    key: 3,
  },
  {
    stockName: "Adarsh Gaming",
    key: 4,
  },
  {
    stockName: "Namra Pharma",
    key: 5,
  },
  {
    stockName: "Aditya Studio",
    key: 6,
  },
  {
    stockName: "Parshwa Electrics",
    key: 7,
  },
  {
    stockName: "Darshana Music",
    key: 8,
  },
  {
    stockName: "Khushali Ice-Cream",
    key: 9,
  },
  {
    stockName: "Honey Dresses",
    key: 10,
  },
];
