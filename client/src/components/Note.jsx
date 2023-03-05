import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Note = ({ note }) => {
  const { currentColor, currentMode, user, setLoan } = useAppContext();
  let r = "0x" + currentColor[1] + currentColor[2];
  let g = "0x" + currentColor[3] + currentColor[4];
  let b = "0x" + currentColor[5] + currentColor[6];
  r = +((r / 255) * 100).toFixed(1);
  g = +((g / 255) * 100).toFixed(1);
  b = +((b / 255) * 100).toFixed(1);
  let rgba1 = "rgb(" + r + "%," + g + "%," + b + "% ,0.8)";
  let rgba2 = "rgb(" + r + "%," + g + "%," + b + "% ,0.2)";
  console.log(rgba1);
  return (
    <div className="bg-white rounded-lg m-2">
      <div
        className="rounded-lg border dark:bg-gray-700 border-gray-100 cursor-pointer shadow-md dark:border-gray-700  h-auto p-5"
        style={{
          borderLeft:
            currentMode !== "Dark"
              ? `4px solid ${currentColor}`
              : "4px solid white",
        }}
      >
        <div className="flex text-center justify-around  dark:text-white font-medium md:text-lg text-base tracking-wide">
          <div className="text-left w-4/5">
            <div>
              <p>Lender: {note.lender}</p>
            </div>
            <div>Amount: {note.principal}rs</div>
            <div>Interest: {note.interest}%</div>
          </div>
          <div className="m-auto">
            <div className="m-auto">
              {note.lender !== user.name && (
                <Link
                  to="/applyLoan"
                  onClick={() => {
                    setLoan(note, -2, null);
                  }}
                  style={{
                    background: currentColor,
                  }}
                  className="p-2 px-5 rounded-md text-white"
                >
                  Apply
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
