import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

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
    <>
      <li className="text-xl font-bold ml-2">
        <Link to="/">Home</Link>
      </li>
      <li className="text-xl font-bold ml-2">
        <Link to="/menu">Our Menu</Link>
      </li>
      {/* Initially Salad e cursor ta thakbe */}
      <li className="text-xl font-bold ml-2">
        <Link to="/order/salad">Order Food</Link>
      </li>

      {
        // user ? 'true' : 'false'
        // user ? condition ? 'double true' : 'one true' : 'false'
      }
      {user && isAdmin && (
        <li>
          <Link className="text-xl font-bold" to="/dashboard/adminHome">
            Dashboard
          </Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link className="text-xl font-bold" to="/dashboard/userHome"></Link>
        </li>
      )}

      <li>
        <Link to="/dashboard/cart">
          <button className="btn">
            <FaShoppingCart className="mr-2"></FaShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>
      {user ? (
        <>
          {/* <span>{user?.displayName}</span> */}
          <button
            onClick={handleLogOut}
            className="btn btn-ghost text-xl font-bold"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <li className="text-xl font-bold">
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
      <li className="text-xl font-bold">
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="sticky top-0 z-20 navbar bg-opacity-40 bg-black text-white max-w-screen-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary lg:hidden"
            >
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-48"
            >
              {navOptions}
            </ul>
          </div>
         
          <div className="flex">
            <img src="../../../../public/image.png" alt="" />
            <a className="btn btn-ghost text-2xl">Foodies Hub</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
