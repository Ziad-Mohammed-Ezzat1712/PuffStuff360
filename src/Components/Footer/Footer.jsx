import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from "../../Context/CartContext1.jsx";import logo from "../../../public/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchat,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {

  const navLinkClass = ({ isActive }) =>
    isActive ? "hover:text-red-500 text-red-500 font-semibold" : "hover:text-red-500 text-white font-semibold";

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-[#4e0000] to-[#1a0000] text-gray-300 px-6 md:px-12 py-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {/* Column 1: Logo */}
          <div className="flex gap-8 items-start">
            <img
              src={logo}
              alt="Logo"
              className="h-24 w-auto object-contain"
            />
             <div className="flex flex-col justify-start gap-y-5 items-start">
              <p className="text-sm leading-relaxed text-left max-w-sm">
              Hello, we are ABC. trying to make an effort to put the right people
              for you to get the best results. Just insight
            </p>

            <p className="underline hover:text-white cursor-pointer text-sm">
              (123) 456-7890
            </p>
             </div>
          </div>

          {/* Column 2: About / Info */}
          <div className="flex flex-col items-start justify-center space-y-3">
          
            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-3">
              <a href="#" className="text-white transitio hover:text-blue-700">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-white transition hover:text-blue-400">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-white transition hover:text-pink-600">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 3: Product */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg text-white mb-4">NavLinks</h3>
                     <NavLink to="/#" className={navLinkClass}>Home</NavLink>                                    
<NavLink to="/products" className={navLinkClass}>Product</NavLink>                                    
           
<NavLink to="/about" className={navLinkClass}>About Us</NavLink>                                      
<NavLink to="/brand" className={navLinkClass}>Brands</NavLink>                                      
<NavLink to="https://m.me/PuffStuffNasr" target="_blank" className={navLinkClass}>Contact US</NavLink>
          </div>

          {/* Column 4: Explore */}
        
        </div>
      </footer>

      {/* Bottom Bar */}
      {/* <div className="bg-gradient-to-r from-[#4e0000] to-[#1a0000] p-6 text-gray-300 text-center md:text-left">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-sm md:text-base font-medium">
            Copyright © 2025 Puff Stuff Group.com
          </h1>
          <p className="text-xs text-gray-400">All rights reserved</p>
        </div>
      </div> */}
    </>
  );
}
