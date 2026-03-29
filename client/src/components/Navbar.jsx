


import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo1.png";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useContext(CartContext);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const phone = "8368319749";
  const whatsappLink = `https://wa.me/${phone}`;

  // ✅ ACTIVE CLASS (DESKTOP)
  const navClass = ({ isActive }) =>
    `font-semibold transition ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
        : "hover:text-blue-500"
    }`;

  // ✅ MOBILE ACTIVE
  const mobileNavClass = ({ isActive }) =>
    `font-semibold ${
      isActive ? "text-blue-600" : "hover:text-blue-500"
    }`;

  return (
    <nav className="bg-gray-300 shadow-md px-6 py-3">

      <div className="flex justify-between items-center">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12" />
        </NavLink>

        {/* CENTER CONTACT */}
        <div className="hidden md:flex items-center gap-4 font-bold text-xl">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-green-600"
          >
            <img
              src="https://img.icons8.com/color/20/whatsapp.png"
              alt=""
            />
            +91 {phone}
          </a>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-5 text-sm">

          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/about" className={navClass}>About Us</NavLink>
          <NavLink to="/contact" className={navClass}>Contact Us</NavLink>

          {/* {!user?.isAdmin && (
            <NavLink to="/cart" className={navClass}>
              Cart
            </NavLink>
          )} */}
{/* 
          {user && !user.isAdmin && (
  <NavLink to="/cart" className={navClass}>
    Cart
  </NavLink>
)} */}

{user && !user.isAdmin && (
  <NavLink to="/cart" className="relative">
    
    {/* ICON */}
    <span className="text-xl">🛒</span>

    {/* BADGE */}
    {totalItems > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
        {totalItems}
      </span>
    )}

  </NavLink>
)}

{/* {user && !user.isAdmin && (
  <NavLink to="/my-orders" className={navClass}>
    My Orders
  </NavLink>
)} */}

          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-green-700 font-bold underline"
                  : "text-green-700 font-bold hover:text-green-500"
              }
            >
              Admin
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm transition font-semibold"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition font-semibold"
            >
              Logout
            </button>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm">

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-green-600 font-bold"
          >
            <img src="https://img.icons8.com/color/20/whatsapp.png" alt="" />
            +91 {phone}
          </a>

          <NavLink to="/" className={mobileNavClass}>Home</NavLink>
          <NavLink to="/products" className={mobileNavClass}>Products</NavLink>
          <NavLink to="/about" className={mobileNavClass}>About Us</NavLink>
          <NavLink to="/contact" className={mobileNavClass}>Contact Us</NavLink>

          {/* {!user?.isAdmin && (
            <NavLink to="/cart" className={mobileNavClass}>
              Cart
            </NavLink>
          )} */}

          {/* {user && !user.isAdmin && (
  <NavLink to="/cart" className={mobileNavClass}>
    Cart
  </NavLink>
)} */}

{user && !user.isAdmin && (
  <NavLink to="/cart" className="flex items-center gap-2">
    
    <span className="text-lg">🛒</span>

    Cart

    {totalItems > 0 && (
      <span className="bg-red-500 text-white text-xs px-2 rounded-full">
        {totalItems}
      </span>
    )}

  </NavLink>
)}

          {user?.isAdmin && (
            <NavLink to="/admin" className="text-green-700 font-bold">
              Admin
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-center"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-2 rounded-md"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
