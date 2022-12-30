import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { quotes } from "../data/dummy";
import "../App.css";

const Fader = ({ text }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });
  const [str, setstr] = useState(text);
  useEffect(() => {
    const timeout = setInterval(() => {
      if (fadeProp.fade === "fade-in") {
        setFadeProp({
          fade: "fade-out",
        });
      } else {
        setFadeProp({
          fade: "fade-in",
        });
      }
    }, 1000);
    return () => clearInterval(timeout);
  }, [fadeProp]);

  useEffect(() => {
    const t = setInterval(() => {
      const rand = Math.floor(Math.random() * 6);
      setstr(() => quotes[rand]);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <h1
        style={{ position: "relative" }}
        data-testid="fader"
        className={fadeProp.fade}
      >
        {str}
      </h1>
    </>
  );
};

Fader.defaultProps = {
  text: quotes[0],
};

Fader.propTypes = {
  text: PropTypes.string,
};
export default Fader;
