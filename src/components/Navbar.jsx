import { useContext } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import userIcon from "../assets/user-removebg-preview.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("successful sign out");
      })
      .catch((error) => {
        console.log("failed to sign out .stay here. dont leave me alone");
      });
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold flex gap-1 items-center px-3 py-2 rounded-md ${
            isActive ? "glass bg-black text-white" : "text-black"
          }`
        }
      >
        <IoHome /> Home
      </NavLink>

      <NavLink
        to="/addTask"
        className={({ isActive }) =>
          `font-semibold flex gap-1 items-center px-3 py-2 rounded-md ${
            isActive ? "glass bg-black text-white" : "text-black"
          }`
        }
      >
        <IoIosAddCircle /> Add Task
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-gray-300 text-black bg-opacity-30 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-500 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold flex items-center gap-0">
          <span>Task</span>
          <span className="text-blue-500">Flow</span>
        </a>
      </div>
      <div className="navbar-end gap-3">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-7">{links}</ul>
        </div>

        {user && user?.email ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 glass text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-green-500 glass text-white px-4 py-2 rounded hover:bg-green-700 font-semibold"
          >
            Login
          </NavLink>
        )}
        <div className="">
          {user && user?.email ? (
            <div className="group relative">
              <img
                className="size-12 rounded-full border-2 border-blue-900 transition-all duration-300"
                src={user?.photoURL}
                alt=""
              />
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded bg-black text-white px-4 py-2 font-semibold text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                {user?.displayName}
              </span>
            </div>
          ) : (
            <div>
              <img className="size-10" src={userIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
