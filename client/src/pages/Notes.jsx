import { legendRender } from "@syncfusion/ej2-react-charts";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header } from "../components";
import Note from "../components/Note";
import { useAppContext } from "../context/appContext";
import { ImCancelCircle } from "react-icons/im";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isMyNotes, setisMyNotes] = useState(false);
  const { authFetch, currentColor, user } = useAppContext();
  useEffect(() => {
    authFetch("loan/getNotes").then((data) => {
      setNotes(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title={isMyNotes ? "My Notes" : "All Notes"} />
        <div className="flex justify-center gap-5 mt-10 mb-5">
          <Link to="/createNote">
            <button
              style={{ background: currentColor }}
              className="p-2 px-7 text-xl mb-5 rounded-md text-white"
            >
              Create
            </button>
          </Link>
          <button
            onClick={() => {
              setisMyNotes(!isMyNotes);
            }}
            style={{ background: currentColor }}
            className="flex gap-2 p-2 px-7 text-xl mb-5 rounded-md text-white"
          >
            {isMyNotes ? "All Notes" : "My Notes"}
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 mx-1">
          {isMyNotes &&
            notes
              .filter((note) => {
                return note.lender === user.name;
              })
              .map((note) => {
                return (
                  <div style={{ width: "28rem" }} key={note._id}>
                    <Note note={note} />
                  </div>
                );
              })}
          {!isMyNotes &&
            notes.map((note) => {
              return (
                <div style={{ width: "28rem" }} key={note._id}>
                  <Note note={note} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
