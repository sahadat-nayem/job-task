
import { IoIosAddCircle } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold flex gap-1 items-center px-3 py-2 rounded-md ${
            isActive ? "bg-black text-white" : "text-black"
          }`
        }
      >
        <IoHome /> Home
      </NavLink>

      <NavLink
        to="/addTask"
        className={({ isActive }) =>
          `font-semibold flex gap-1 items-center px-3 py-2 rounded-md ${
            isActive ? "bg-black text-white" : "text-black"
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

        {/* {user && user?.email ? (
            <button
              onClick={logOut}
              className="hover:text-yellow-400 font-semibold"
            >
              Log Out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="hover:text-yellow-400 font-semibold pr-5"
            >
              Login
            </NavLink>
          )}
          <div className="">
            {user && user?.email ? (
              <div className="group relative lg:hidden">
                <img
                  className="size-12 rounded-full  border-2 to-blue-900"
                  src={user?.photoURL}
                  alt=""
                />
                <span className="absolute bottom-0 left-0 right-0 font-semibold bg-gray-100 text-black text-center opacity-0 group-hover:opacity-100  ">
                  {user?.displayName}
                </span>
              </div>
            ) : (
              <div>
                <img className="size-10" src={userIcon} />
              </div>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default Navbar;
