import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "../../Context/CartContext1";
import { useLanguage } from "../../Context/LanguageContext";
import VapeWarningBar from "../VapeWarningBar/VapeWarningBar";

export default function Navbar2() {
  const { totalItems } = useCart();
  const { lang, toggleLanguage, isArabic } = useLanguage();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const token = localStorage.getItem("userToken");
  const userName = localStorage.getItem("username");

  const t = {
    home: isArabic ? "الرئيسية" : "Home",
    products: isArabic ? "المنتجات" : "Products",
    about: isArabic ? "من نحن" : "About Us",
    brands: isArabic ? "العلامات التجارية" : "Brands",
    contact: isArabic ? "تواصل معنا" : "Contact Us",
    login: isArabic ? "تسجيل الدخول" : "Login",
    register: isArabic ? "إنشاء حساب" : "Register",
    logout: isArabic ? "تسجيل الخروج" : "Sign Out",
    hello: isArabic ? "مرحبًا" : "Hello",
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 font-semibold"
      : "text-white hover:text-red-500 font-semibold";

  return (
    <>
      {/* <VapeWarningBar /> */}

      <nav className="absolute top-0 w-full z-50 px-6 md:px-10 py-6">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto w-full">

          {/* Logo */}
          <NavLink to="/" className="flex items-center mr-10">
            <img src={logo} className="h-12 w-auto" alt="Logo" />
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-12 text-md font-medium">
              <li><NavLink to="/" className={navLinkClass}>{t.home}</NavLink></li>
              <li><NavLink to="/products" className={navLinkClass}>{t.products}</NavLink></li>
              <li><NavLink to="/about" className={navLinkClass}>{t.about}</NavLink></li>
              <li><NavLink to="/brand" className={navLinkClass}>{t.brands}</NavLink></li>
              <li>
                <NavLink
                  to="https://m.me/PuffStuffNasr"
                  target="_blank"
                  className={navLinkClass}
                >
                  {t.contact}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-5 ml-6">

              {/* Cart */}
              <NavLink className="relative p-2 bg-white rounded-full" to="/cart">
                <ShoppingCart size={24} color="#000" />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </div>
              </NavLink>

              {/* Wishlist */}
              <NavLink className="p-2 bg-white rounded-full" to="/wishlist">
                <Heart size={24} color="#000" />
              </NavLink>

              {/* Language */}
              <button
                onClick={toggleLanguage}
                className="p-2 bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm text-black"
              >
                {lang === "ar" ? "EN" : "AR"}
              </button>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 bg-white rounded-full"
                >
                  <User size={24} color="#000" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">
                    {!token ? (
                      <>
                        <NavLink to="/login" className="block px-4 py-2 hover:bg-[#4E0000] hover:text-white">
                          {t.login}
                        </NavLink>
                        <NavLink to="/register" className="block px-4 py-2 hover:bg-[#4E0000] hover:text-white">
                          {t.register}
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 font-semibold">
                          {t.hello} {userName ?? "User"}
                        </div>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-[#4E0000] hover:text-white"
                          onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                          }}
                        >
                          {t.logout}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden w-full bg-[#1d0606] text-white px-4 py-4 space-y-4 rounded-b-2xl mt-4">

            <NavLink to="/" className="block hover:text-[#b61818]  text-white">{t.home}</NavLink>
            <NavLink to="/products" className="block hover:text-[#b61818] text-white">{t.products}</NavLink>
            <NavLink to="/about" className="block hover:text-[#b61818] text-white">{t.about}</NavLink>
            <NavLink to="/brand" className="block hover:text-[#b61818] text-white">{t.brands}</NavLink>
 <div className="flex justify-center items-center gap-4 pt-4 border-t border-gray-600">

              {/* Cart */}
              <NavLink className="relative py-2 px-2 bg-white rounded-full" to="/cart">
                <ShoppingCart size={22} color="#000" />
                <div className="absolute -top-2 -right-2 size-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </div>
              </NavLink>

              {/* Wishlist */}
              <NavLink className="py-2 px-2 bg-white rounded-full" to="/wishlist">
                <Heart size={22} color="#000" />
              </NavLink>

              {/* Language */}
              <button
                onClick={toggleLanguage}
                className="py-2 px-2 bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm text-black"
              >
                {lang === "ar" ? "EN" : "AR"}
              </button>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="py-2 px-2 bg-white rounded-full"
                >
                  <User size={22} color="#000" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50 text-black">
                    {!token ? (
                      <>
                        <NavLink to="/login" className="block px-4 py-2 hover:bg-[#4E0000] hover:text-white">
                          {t.login}
                        </NavLink>
                        <NavLink to="/register" className="block px-4 py-2 hover:bg-[#4E0000] hover:text-white">
                          {t.register}
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 font-semibold">
                          {t.hello} {userName ?? "User"}
                        </div>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-[#4E0000] hover:text-white"
                          onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                          }}
                        >
                          {t.logout}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </nav>
    </>
  );
}