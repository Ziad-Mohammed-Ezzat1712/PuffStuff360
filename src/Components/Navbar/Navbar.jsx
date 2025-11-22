import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../../public/logo.png";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from '../../Context/CartContext1';


export default function Navbar() {
const { totalItems } = useCart();
const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);
const [userMenuOpen, setUserMenuOpen] = useState(false);
let {pathname} = useLocation(); 
const token = localStorage.getItem("userToken");
const userName = localStorage.getItem("username"); // لو بتحفظ الاسم



  const navLinkClass = ({ isActive }) =>
    isActive ? "hover:text-red-500 text-red-500 font-semibold" : "hover:text-red-500 text-white font-semibold";


  return (
    <>
      <nav className={pathname === "/about" ? "text-white top-0 right-0 left-0 md:bg-[rgba(0,0,0,0.23)] max-w-[1600px] mx-auto my-10 rounded-full" :"text-white top-0 right-0 left-0 md:bg-[#1d0606] max-w-[1600px] mx-auto my-10 rounded-full"}>
        <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-2xl p-4 gap-y-4">

          {/* Logo */}
          <NavLink to='/'>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <span className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-12 w-auto" alt="Logo" />
              </span>
            </div>
          </NavLink>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Desktop Menu Links */}
          <div className="hidden w-full md:flex-1 md:flex justify-center order-last md:order-none">
            <ul className="flex gap-10 text-md font-medium">
              <li><NavLink to="/#" className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/products" className={navLinkClass}>Product</NavLink></li>
           
              <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
              <li><NavLink to="https://m.me/PuffStuffNasr" target="_blank" className={navLinkClass}>Contact US</NavLink></li>
            </ul>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex w-full md:w-auto justify-center md:justify-end">
            <ul className="flex gap-4 items-center">

              {/* Cart Icon */}
              <NavLink className="text-white relative py-2 px-2 bg-white rounded-full hover:text-white" to="cart">
                <ShoppingCart size={24} color="#000" />
                <div className="absolute top-[-13px] right-[-15px] flex items-center justify-center size-5 rounded-full bg-red-600 text-white text-xs font-bold">
                  {totalItems}
                </div>
              </NavLink>

              {/* Heart Icon */}
              <NavLink className="text-white relative py-2 px-2 bg-white rounded-full hover:text-white" to="cart">
                <Heart size={24} color="#000" />
                <div className="absolute top-[-13px] right-[-15px] flex items-center justify-center size-5 rounded-full bg-red-600 text-white text-xs font-bold">
                  {totalItems}
                </div>
              </NavLink>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="text-white relative py-2 px-2 bg-white rounded-full hover:text-white"
                >
                  <User size={24} color="#000" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <ul className="flex flex-col py-2">

                      {!token ? (
                        <>
                          <li>
                            <NavLink
                              to="/login"
                              className="block px-4 py-2 text-gray-700 hover:bg-[#4E0000] hover:text-white transition"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Login
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/register"
                              className="block px-4 py-2 text-gray-700 hover:bg-[#4E0000] hover:text-white transition"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Register
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="px-4 py-2 text-gray-800 text-left font-semibold">
                           hello!  {userName ?? "User"}
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#4E0000] hover:text-white transition"
                              onClick={() => {
                                localStorage.removeItem("userToken");
                                localStorage.removeItem("username");
                                setUserMenuOpen(false);
                                navigate("/login");
                              }}
                            >
                              Sign Out
                            </button>
                          </li>
                        </>
                      )}

                    </ul>
                  </div>
                )}
              </div>

            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1d0606] text-white text-left px-4 py-3 space-y-4">
            <ul className="space-y-2 text-sm">
              {!token ? (
                <>
                  <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                  <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>
                </>
              ) : (
                <>
                  <li className="px-4 py-2 text-gray-800 font-semibold">{userName ?? "User"}</li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#4E0000] hover:text-white transition"
                      onClick={() => {
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("username");
                        setMenuOpen(false);
                        navigate("/login");
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
              <li>
                <NavLink className="relative inline-block hover:text-red-500 text-white font-semibold" to="/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="ml-2 text-white font-semibold bg-red-600 text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                </NavLink>
              </li>
            </ul>

            <div className="border-t border-white pt-3">
              <ul className="flex flex-col gap-2 text-sm font-medium">
                <li><NavLink to="/#" className={navLinkClass}>Home</NavLink></li>
                <li><NavLink to="/products" className={navLinkClass}>Product</NavLink></li>
            
                <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
                <li><NavLink to="/cart" className={navLinkClass}>Contact US</NavLink></li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
