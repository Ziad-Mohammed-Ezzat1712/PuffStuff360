import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { ShoppingCart, Heart, User, Languages } from "lucide-react";
import { useCart } from "../../Context/CartContext1";
import { useLanguage } from "../../Context/LanguageContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { lang, toggleLanguage, isArabic } = useLanguage();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  let { pathname } = useLocation();
  const token = localStorage.getItem("userToken");
  const userName = localStorage.getItem("username");

  // ================= Translations =================
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
    language: isArabic ? "English" : "العربية",
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "hover:text-red-500 text-red-500 font-semibold"
      : "hover:text-red-500 text-white font-semibold";

  return (
    <>
      <nav
        className={
          pathname === "/about"
            ? "text-white top-0 right-0 left-0 md:bg-[rgba(0,0,0,0.23)] max-w-[1600px] mx-auto my-10 rounded-full"
            : "text-white top-0 right-0 left-0 md:bg-[#1d0606] max-w-[1600px] mx-auto my-10 rounded-full"
        }
      >
        <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-2xl p-4 gap-y-4">
          {/* Logo */}
          <NavLink to="/">
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <img src={logo} className="h-12 w-auto" alt="Logo" />
            </div>
          </NavLink>

          {/* Hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Desktop Links */}
          <div className="hidden w-full md:flex-1 md:flex justify-center">
            <ul className="flex gap-10 text-md font-medium">
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

          {/* Desktop Icons */}
          <div className="hidden md:flex w-full md:w-auto justify-end">
            <ul className="flex gap-4 items-center">
              {/* Cart */}
              <NavLink className="relative py-2 px-2 bg-white rounded-full" to="/cart">
                <ShoppingCart size={24} color="#000" />
                <div className="absolute -top-3 -right-3 size-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </div>
              </NavLink>

              {/* Wishlist */}
              <NavLink className="relative py-2 px-2 bg-white rounded-full" to="/wishlist">
                <Heart size={24} color="#000" />
                <div className="absolute -top-3 -right-3 size-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </div>
              </NavLink>
      {/* Language */}
              {/* <button
                onClick={toggleLanguage}
                className="py-2 px-2 bg-white rounded-full"
                title={t.language}
              >
                <Languages size={22} color="#000" />
              </button> */}

              {/* Language */}
<button
  onClick={toggleLanguage}
  className="py-2 px-2 bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm text-black"
  title={t.language}
>
  {lang === "ar" ? "EN" : "AR"}
</button>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="py-2 px-2 bg-white rounded-full"
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

        
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1d0606] text-white px-4 py-4 space-y-4">
            <NavLink to="/" className={navLinkClass}>{t.home}</NavLink>
            <NavLink to="/products" className={navLinkClass}>{t.products}</NavLink>
            <NavLink to="/about" className={navLinkClass}>{t.about}</NavLink>
            <NavLink to="/brand" className={navLinkClass}>{t.brands}</NavLink>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 font-semibold"
            >
              <Languages size={18} />
              {t.language}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
