// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../../public/logo.png";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from '../../Context/CartContext1';
import { motion, useScroll, useTransform } from "framer-motion";
import bgImage3 from '../../../public/bgImage3.png';
import bgImage2 from '../../../public/bgImage2.png';
import sp from '../../assets/Images/sp.png';
import Footer from '../Footer/Footer';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchat,
  FaLinkedinIn,
} from "react-icons/fa";

export default function AboutUs() {
const { totalItems } = useCart();
const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);
const [userMenuOpen, setUserMenuOpen] = useState(false);
let {pathname} = useLocation(); 
const token = localStorage.getItem("userToken");
const userName = localStorage.getItem("username"); // لو بتحفظ الاسم



  const navLinkClass = ({ isActive }) =>
    isActive ? "hover:text-red-500 text-white font-semibold" : "hover:text-red-500 text-white font-semibold";

const { scrollY } = useScroll();
const opacity2 = useTransform(scrollY, [0, 300], [1, 0]);  


const start = 400;  // يبدأ يتحرك بعد 400px
const end = 1200;   // يوصل لوضعه النهائي عند 1200px

// الحركة من 400px → 1200px
const xMove = useTransform(scrollY, [start, end], [400, 0]);
const yMove = useTransform(scrollY, [start, end], [-300, 0]);
const opacity = useTransform(scrollY, [start, end], [0, 1]);
  return (
    <>
<section
  className="relative  bg-cover bg-no-repeat max-w-8xl h-fit "
  style={{ backgroundImage: `url(${bgImage3})` }}
>
  <div className="absolute inset-0 bg-black/50"></div>
      <nav className={pathname === "/about" ? "   absolute text-white top-0 right-0 left-0 md:bg-[rgba(0,0,0,0.23)] max-w-[1600px] mx-auto my-10 rounded-full" :"text-white top-0 right-0 left-0 md:bg-[#1d0606] max-w-[1600px] mx-auto my-10 rounded-full"}>
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
              <li><NavLink to="/cart" className={navLinkClass}>Product</NavLink></li>
            
              <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
              <li><NavLink to="https://" target="_blank" className={navLinkClass}>Contact US</NavLink></li>
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
                <li><NavLink to="/cart" className={navLinkClass}>Product</NavLink></li>
              
                <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
                <li><NavLink to="/cart" className={navLinkClass}>Contact US</NavLink></li>
              </ul>
            </div>
          </div>
        )}
      </nav>
{/* div1 */}
  <motion.div 
  style={{ opacity: opacity2 }}
  className="flex flex-col justify-center items-center md:pt-[80px] pt-[300px] text-white text-center min-h-dvh px-4 max-w-4xl mx-auto z-50"
>
  <h1 className="md:text-[90px] text-[24px] font-bold mb-4 text-white z-50">Egypt’s Leading Vape Store</h1>
  <p className="md:text-[20px] text-[16px] md:px-0 px-6 mb-6 z-50 ">
   We take pride in being the strongest and most trusted vape store in Egypt. Our mission is to offer premium vaping devices, top-quality e-liquids, and reliable accessories that meet the highest standards. Whether you’re a beginner or an experienced vaper, we provide a smooth and professional experience with products you can depend on. Your satisfaction and safety always come first.
  </p>
 <Link to="/" className='z-50 md:mb-0'>
  <button className="bg-black/20 w-[198px] cursor-pointer md:text-[24px] text-[16] text-white px-[28px] py-[8px] rounded-md hover:bg-black/30 transition z-50 ">
    Home
  </button>
 </Link>
</motion.div>
{/* div2 */}
<motion.div 
  style={{ x: xMove, y: yMove, opacity }}
  className="flex flex-col justify-center items-center text-white text-center min-h-dvh px-4 max-w-4xl mx-auto z-50"
>
  <img 
    src={sp} 
    alt="about"
    className="rotate-[-15.965deg]"
  />
</motion.div>
{/* div3 */}
   <motion.div 
  initial={{ y: 150, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 2 }}
  viewport={{ once: true }}
  className="flex justify-between items-center text-white min-h-dvh max-w-[1550px] mx-auto z-50"
>
  <div className='z-50'>
    <h1 className="text-[45px] text-left font-bold mb-4 text-white">A Simple, Modern Store Designed for Every Vaper</h1>
    <p className="text-[20px] mb-6 text-left">
      Our store is built to give every vaper in Egypt a smooth, easy, and hassle-free experience. Whether you're new to vaping or a long-time user, you'll find everything you need in one place. We offer the latest devices, the newest e-liquid flavors, and a wide range of accessories — all carefully selected to match every style and preference. Fast, simple, and always updated with the newest releases.
    </p>
    <Link to="/products" className='z-50'>
      <button className="bg-black/20 w-[240px] text-[24px] text-white px-[28px] py-[8px] rounded-md hover:bg-black/30 transition">
        Our Product
      </button>
    </Link>
  </div>

  <div className='z-50'>
    <img src={sp} alt='about' className='z-50' />
  </div>
</motion.div>






   <footer className="bg-black/40 text-gray-300 px-6 md:px-12 py-12 ">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 z-50">
          
          {/* Column 1: Logo */}
          <div className="flex gap-8 items-start z-50">
            <img
              src={logo}
              alt="Logo"
              className="h-24 w-auto object-contain"
            />
             <div className="flex flex-col justify-start gap-y-5 items-start z-50">
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
          <div className="flex flex-col items-start justify-center space-y-3 z-50">
          
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
          <div className="flex flex-col items-start z-50">
            <h3 className="font-semibold text-lg text-white mb-4">NavLinks</h3>
                     <NavLink to="/#" className={navLinkClass}>Home</NavLink>                                    
<NavLink to="/products" className={navLinkClass}>Product</NavLink>                                    
           
<NavLink to="/about" className={navLinkClass}>About Us</NavLink>                                      
<NavLink to="https://m.me/PuffStuffNasr" target="_blank" className={navLinkClass}>Contact US</NavLink>
          </div>

          {/* Column 4: Explore */}
        
        </div>
      </footer>
</section>

    </>
  )
}
