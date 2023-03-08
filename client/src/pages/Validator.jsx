import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuyStock from "../components/BuyStock";
import { MarketViewData } from "../data/dummy";

const Validator = () => {
  const { stockName: activeStockName, id: activeStockId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (Number(activeStockId) > 10 && Number(activeStockId) < 1) ||
      MarketViewData[activeStockId - 1]?.stockName !== activeStockName
    ) {
      navigate("/marketView");
    } else {
    }
  }, []);

  return (
    <BuyStock activeStockName={activeStockName} activeStockId={activeStockId} />
  );
};

export default Validator;
