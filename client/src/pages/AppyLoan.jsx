import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { Header } from "../components";
import { useAppContext } from "../context/appContext";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  Tooltip,
  ColumnSeries,
  Category,
  DataLabel,
  Zoom,
} from "@syncfusion/ej2-react-charts";

const ApplyLoan = ({ isRepay }) => {
  let lineChartData = [];
  const { currentColor, authFetch, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  let lender = localStorage.getItem("lender");
  let principal = localStorage.getItem("principal");
  let interest = localStorage.getItem("interest");
  let id = localStorage.getItem("id");
  let outstanding = localStorage.getItem("outstanding");
  let date = localStorage.getItem("date");
  // const [linechartData, setLinechartData] = useState([]);
  useEffect(() => {
    let t = setTimeout(() => {
      setChart(true);
    }, 2000);
    return () => [clearTimeout(t)];
  }, []);
  let linechartData = [];
  let tempDate = new Date();
  let tempOut = Number(outstanding);
  for (let i = 0; i < 12; i++) {
    tempOut =
      Number(outstanding) +
      Number(Number(principal) * i * Number(interest)) / Number(1200);
    console.log(tempOut);
    lineChartData.push({
      x: `${zeroPad(tempDate.getMonth() + 1, 2)}/${tempDate.getFullYear()}`,
      y: Number(tempOut),
    });
    tempDate.setDate(tempDate.getDate() + 30);
  }
  console.log(lineChartData);
  const primaryxAxis = {
    valueType: "Category",
    labelPlacement: "OnTicks",
    majorGridLines: {
      color: currentColor,
      width: 0,
    },
    title: "Month",
  };
  const primaryyAxis = {
    majorGridLines: {
      color: currentColor,
      width: 0.5,
    },
    title: "Outstanding",
  };
  const date1 = new Date(date);
  let day = date1.getDate();
  let month = date1.getMonth() + 1;
  let year = date1.getFullYear();
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authFetch.post("loan/grantLoan", {
        _id: id,
      });
      setMessage("Congrats!! You Successfully Got A Loan");
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.msg);
      setIsSuccess(false);
      setLoading(false);
    }
  };
  const handleRepay = async () => {
    setLoading(true);
    try {
      await authFetch.post("loan/repayLoan", {
        _id: id,
        outstanding,
      });
      setMessage("Congrats!! You Successfully Repay Your Loan");
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.msg);
      setIsSuccess(false);
      setLoading(false);
    }
  };
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 mx-2 md:mx-9 p-2 pb-10 md:p-10 dark:bg-secondary-dark-bg bg-white rounded-3xl">
      <Header
        category="App"
        title={isRepay ? "Repay Loan" : "Apply For A Loan"}
      />
      {loading && (
        <div className="w-full mb-5">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      )}
      <div className="text-center flex justify-evenly flex-col gap-4 text-lg md:text-2xl dark:text-white">
        {!loading && (
          <p
            className="font-semibold"
            style={{ color: isSuccess ? "green" : "red" }}
          >
            {message}
          </p>
        )}
        <div className="flex xl:flex-row flex-col gap-10">
          {isRepay && <p>Outstanding: {outstanding}</p>}
          <div>
            <p>Lender : {lender?.toUpperCase()}</p>
          </div>
          <div>Amount : {principal}rs</div>
          <div>Interest : {interest}%</div>
          {isRepay && (
            <p>
              Issued Date: {zeroPad(day, 2)}/{zeroPad(month, 2)}/{year}
            </p>
          )}
        </div>
        <div className="m-auto mt-6 flex gap-5">
          <div className="m-auto">
            {lender !== user.name && (
              <button
                style={{
                  background: currentColor,
                }}
                onClick={isRepay ? handleRepay : handleSubmit}
                className="p-2 px-5 rounded-md text-white"
              >
                {isRepay ? "Repay" : "Apply"}
              </button>
            )}
          </div>
          <div className="m-auto">
            <Link
              to="/notes"
              style={{
                background: currentColor,
              }}
              onClick={handleSubmit}
              className="p-2 px-5 rounded-md text-white"
            >
              Notes
            </Link>
          </div>
        </div>
        {isRepay && chart && (
          <div className="w-full m-auto md:w-10/12 mt-10 block border-1 border-black border-solid rounded-xl ">
            <ChartComponent
              border={{ width: 0 }}
              background="#fafbfb"
              height="400"
              id="charts"
              primaryXAxis={primaryxAxis}
              primaryYAxis={primaryyAxis}
              title={`Future Outstandings`}
              legendSettings={{ visible: true }}
              tooltip={{ enable: true }}
              margin={{ left: 10, right: 40, top: 30, bottom: 0 }}
            >
              <Inject
                services={[
                  ColumnSeries,
                  Legend,
                  DataLabel,
                  Tooltip,
                  LineSeries,
                  Category,
                  Zoom,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={lineChartData}
                  xName="x"
                  yName="y"
                  name={`Now: ${outstanding}`}
                  width={2}
                  marker={{
                    visible: true,
                    height: 5,
                    width: 5,
                    shape: "Diamond",
                    fill: currentColor,
                  }}
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyLoan;
