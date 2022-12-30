import logoLight from "../utils/img/logolight.jpg";
import logoDark from "../utils/img/logodark.jpg";
import { useStateContext } from "../context/ContextProvider";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetTheme from "../components/SetTheme";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

export default function Register() {
  const navigate = useNavigate();
  const { currentMode, currentColor } = useStateContext();
  const { user, alertType, showAlert, displayAlert, setupUser, alertText } =
    useAppContext();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  const [state, setstate] = useState(initialState);
  const toggle = () => {
    setstate({ ...state, isMember: !state.isMember });
  };
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = state;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    console.log(1);
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      console.log(2);
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };
  return (
    <>
      <div className="dark:bg-secondary-dark-bg dark:text-white min-h-full m-0 pt-0 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
          <div>
            <Link to="/landing">
              <img
                className="mx-auto h-20 w-auto"
                src={currentMode === "Dark" ? logoDark : logoLight}
                alt="Workflow"
              />
            </Link>
            <h2
              style={{ color: currentColor }}
              className="mt-12 text-center text-3xl  dark:text-white text-gray-900"
            >
              {state.isMember
                ? " Sign In To Your Account  "
                : " Create New Account "}
            </h2>
            <h2 className="mt-2 text-center text-xl  dark:text-white text-gray-900">
              {showAlert && (
                <div className={`text-${alertType}-400`}>{alertText}</div>
              )}
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              {!state.isMember && (
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={state.value}
                    onChange={handleChange}
                    className={
                      "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white focus:z-10 sm:text-md dark:placeholder-white dark:border-slate-500 dark:focus:border-gray-300"
                    }
                    placeholder="Name"
                  />
                </div>
              )}
              <div className="mb-10 mt-10">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  value={state.email}
                  name="email"
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:focus:border-gray-300 dark:placeholder-white
                  ${state.isMember ? "rounded-t-md" : ""}`}
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-500 dark:focus:border-gray-300 placeholder-gray-500 dark:placeholder-white text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-slate-700 dark:text-white"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="m-5">
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  style={{
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                  }}
                  className={`text-md text-white p-3 hover:drop-shadow-xl `}
                >
                  {state.isMember ? "Sign in" : "Register"}
                </button>
              </div>
            </div>
            <div className="text-center font-medium">
              {state.isMember ? " New User?  " : "Already Member? "}
              <button
                type="button"
                onClick={toggle}
                className="font-bold"
                style={{ color: currentColor }}
              >
                {state.isMember ? "Register" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SetTheme />
    </>
  );
}
