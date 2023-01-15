import React, { useState } from "react";
import { Header } from "../components";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import { Link, Navigate, useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { currentColor, authFetch, user } = useAppContext();
  const navigate = useNavigate();
  const initialState = {
    principal: "",
    interest: "",
  };
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(state.principal, state.interest, user.name);
    try {
      await authFetch.post("loan/createNote", {
        lender: user.name,
        principal: state.principal,
        interest: state.interest,
      });
      setMessage("Note Created!!");
      setLoading(false);
      navigate("/notes");
    } catch (error) {
      console.log(error);
      setMessage("Some Thing Went Wrong!!");
      setLoading(false);
    }
  };
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2  p-2 md:p-6  dark:bg-secondary-dark-bg rounded-3xl">
      <div className="flex justify-between text-center flex-wrap flex-col">
        <Header title="Create Note" />
        {loading && (
          <div className="w-full mb-5">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        )}
        <div className="max-w-sm -mt-7 w-full space-y-8 m-auto">
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-10 mt-10">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="number"
                  value={state.principal}
                  name="principal"
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:focus:border-gray-300 dark:placeholder-white
                  ${state.isMember ? "rounded-t-md" : ""}`}
                  placeholder="Principal"
                  min={"0"}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="interest"
                  type="number"
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-500 dark:focus:border-gray-300 placeholder-gray-500 dark:placeholder-white text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-slate-700 dark:text-white"
                  placeholder="Interest"
                  max={"100"}
                  min={"0"}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center gap-5 mt-10 mb-5">
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  style={{
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                  }}
                  className={`text-md text-white p-3 hover:drop-shadow-xl `}
                >
                  Create
                </button>
                <Link to="/notes">
                  <button
                    type="submit"
                    onSubmit={handleSubmit}
                    style={{
                      backgroundColor: currentColor,
                      borderRadius: "10px",
                    }}
                    className={`text-md text-white p-3 hover:drop-shadow-xl `}
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
