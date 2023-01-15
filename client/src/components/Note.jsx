import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Note = ({ note }) => {
  const { currentColor } = useAppContext();
  return (
    <div className="p-4">
      <div className="rounded-lg border border-gray-100 cursor-pointer shadow-md dark:bg-gray-700 dark:border-gray-700  h-auto p-5">
        <div className="flex text-center justify-around dark:text-white text-black md:text-lg text-base">
          <div className="text-left w-4/5">
            <div>
              <p>Lender: {note.lender}</p>
            </div>
            <div>Amount: {note.principal}rs</div>
            <div>Interest: {note.interest}%</div>
          </div>
          <div className="m-auto">
            <div className="m-auto">
              <button
                style={{ background: currentColor }}
                className="p-2 px-5 rounded-md text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
