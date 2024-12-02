import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import "./Navbar.css";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart(); // From Tan Stack

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <div className="flex">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-inactive"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-inactive"
          }
        >
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/order/salad"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-inactive"
          }
        >
          Order Food
        </NavLink>
      </li>

      {user && isAdmin && (
        <li>
          <NavLink
            to="/dashboard/adminHome"
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-inactive"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      {user && !isAdmin && (
        <li>
          <NavLink
            to="/dashboard/userHome"
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-inactive"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/dashboard/cart"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-inactive"
          }
        >
          <button className="btn">
            <FaShoppingCart className="mr-2 " />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>

      {user ? (
        <>
          <button
            onClick={handleLogOut}
            className="btn btn-ghost nav-inactive hover:text-white"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
            >
              Login
            </NavLink>
          </li>
        </>
      )}

      {
        !user ? <li>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive ? "nav-active" : "nav-inactive"
          }
        >
          Sign Up
        </NavLink>
      </li> : '' 
      }
    </div>
  );

  return (
    <div className="sticky top-0 z-20 navbar bg-opacity-60 bg-black text-white max-w-screen-2xl">
      <div className="navbar-start">
        <div className="flex items-center">
          <a className="btn border-t-cyan-300 text-2xl">Foodies Hub</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center">{navOptions}</ul>
      </div>
      <div className="navbar-end lg:hidden">
        <div className="dropdown">
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-500 rounded-box w-48"
          >
            {navOptions}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default NavBar;
