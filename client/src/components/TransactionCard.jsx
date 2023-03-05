import React from "react";

const TransactionCard = ({ item, userName, isStockTransaction }) => {
  let time = new Date(item.transactionTime).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  let timeData = time.split("/");
  let buyDay = timeData[1];
  let BuyMonth = timeData[0];
  let BuyYear = timeData[2].slice(0, 4);
  let newTransactionTime = `${buyDay}/${BuyMonth}/${BuyYear}`;
  return (
    <div
      className="lg:w-2/5 w-full m-2 py-3 px-4 dark:text-white lg:text-lg shadow-sm dark:shadow-md"
      style={{
        borderLeft:
          item.receiver === userName
            ? "3px solid #7ced65"
            : "3px solid #e44f52",
        borderRadius: "10px",
      }}
    >
      {isStockTransaction && (
        <div className="flex flex-row justify-between m-auto">
          <div className="flex flex-col justify-center text-left">
            <p>Stock: {item.stockName}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Date: {newTransactionTime}</p>
          </div>
          <div className="flex flex-col justify-center text-right">
            <p>
              {item.receiver === userName ? "+" : "-"} {item.amount} &#8377;
            </p>
          </div>
        </div>
      )}
      {!isStockTransaction && item.receiver !== "Tip Account" && (
        <div>
          <div className="flex flex-row justify-between my-auto">
            <div className="flex flex-col justify-center text-left my-auto">
              {item.receiver === userName ? (
                <p>From: {item.giver}</p>
              ) : (
                <p>To: {item.receiver}</p>
              )}
              <p>Date: {newTransactionTime}</p>
            </div>
            <div className="flex flex-col justify-center text-right">
              <p>
                {item.receiver === userName ? "+" : "-"} {item.amount} &#8377;
              </p>
            </div>
          </div>
        </div>
      )}
      {!isStockTransaction && item.receiver === "Tip Account" && (
        <div>
          <div className="flex flex-row justify-between my-auto">
            <div className="flex flex-col justify-center text-left my-auto">
              {item.receiver === userName ? (
                <p>From: {item.giver}</p>
              ) : (
                <p>To: {item.receiver}</p>
              )}
              <p>Date: {newTransactionTime}</p>
            </div>
            <div className="flex flex-col justify-center text-right">
              <p>
                {item.receiver === userName ? "+" : "-"} {item.amount} &#8377;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
