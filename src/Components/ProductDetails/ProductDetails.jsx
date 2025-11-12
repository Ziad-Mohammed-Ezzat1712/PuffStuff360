import React, { useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";import { useParams } from "react-router-dom";
import blue from "../../assets/Images/blueice.webp";
import peach from "../../assets/Images/blueice.webp"; // مثال لصورة تانية
import vo from "../../assets/Images/vo.png"; // مثال لصورة تانية
import i from "../../assets/Images/in.png"; // مثال لصورة تانية
import { Heart } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import Suggestions from "../Suggestions/Suggestions";
import Offers from "../OFFERS/OFFERS";
import New from "../New/New";
export default function ProductDetails() {
  const { id } = useParams();

  // بيانات مؤقتة (Static)
  const product = {
    id,
    name: "FLA Black Currant & Grapes",
    price: "200 EG",
    oldPrice: "200 EG",
    rating: 4.6,
    buyers: "212 reviews",
    text: "93% of buyers have recommended this",
    image: blue,
    description:
      "Introducing SPLASH – Currant & Grapes Flavor. Experience the power of Egypt’s strongest liquid! Refreshing, bold, and bursting with fruity flavor.",
    flavors: [
      { id: 1, image: peach },
      { id: 2, image: blue },
      { id: 3, image: peach },
      { id: 4, image: blue },
      { id: 5, image: blue },
      { id: 6, image: peach },
      { id: 7, image: blue },
      { id: 8, image: peach },
    ],
  };

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <>
    <div className=" text-white min-h-screen px-6 md:px-20 py-16 flex flex-col md:flex-row gap-16">
      {/* ===== Left: Product Image ===== */}
      <div className="flex-1 flex justify-center items-start">
        <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* ===== Right: Details ===== */}
      <div className="flex-1 flex flex-col justify-start space-y-6">
        {/* Title */}
        <h2 className="text-3xl  text-left font-bold tracking-wide">
          {product.name}
        </h2>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold text-white">{product.price}</p>
            <p className="line-through text-gray-500 text-lg text-left">{product.oldPrice}</p>
          </div>
          <div className="flex flex-row gap-4 items-end">
            <div className="flex items-center text-yellow-400 text-lg ">
              <span>★</span><span>★</span><span>★</span><span>★</span>
              <span className="text-gray-500">★</span>
              <span className="text-sm text-gray-400 ml-2">{product.rating}</span>
               <p className="text-gray-400 text-xs ml-2 ">({product.buyers})</p>
            </div>
           
          </div>
        </div>

        {/* Recommended Text */}
        <p className="text-sm text-right text-gray-400">{product.text}</p>

        {/* NIC & SIZE */}
        <div className="flex items-start justify-between gap-10">
          {/* NIC */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-left">NIC</h3>
            <div className="flex flex-wrap gap-2">
              {[3, 6, 8, 12, 18].map((n) => (
                <button
                  key={n}
                  className="w-10 h-10 border border-gray-500 rounded-lg text-white hover:bg-[#790000] transition"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-left">SIZE</h3>
            <div className="flex flex-wrap gap-2">
              {[30, 60,100, 120].map((s) => (
                <button
                  key={s}
                  className="w-12 h-10 border border-gray-500 rounded-lg text-white hover:bg-[#790000] transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quantity + Buttons */}
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex items-center border px-6 py-0 font-bold border-gray-2  00 rounded-lg">
            <button className="px-[6px] py-0 rounded-full text-xl border border-gray-200 font-semibold">-</button>
            <span className="px-6 py-2 font-semibold text-xl">1</span>
            <button className="px-[6px] py-0 rounded-full text-xl border border-gray-200 font-semibold">+</button>
          </div>

          <div className="flex gap-4">
           
            <button className="border border-white text-wborder-white hover:bg-[#790000] hover:border-transparent hover:text-white px-6 py-2 rounded-lg">
              Buy Now
            </button>
             <button className="bg-[#790000] hover:border hover:border-white hover:bg-transparent text-white px-6 py-2 rounded-lg">
              Add to cart <FontAwesomeIcon icon={faCartShopping} className="text-gray-200 text-lg" />

            </button>
             <button className="w-10 h-10 border border-gray-500 rounded-lg flex items-center justify-center transition">
                  <Heart size={20} className="text-[#ffffff]" />
                </button>
          </div>
        </div>

        {/* Payment Option */}
        <div className="mt-6 flex  gap-10">
          <h3 className="text-lg font-semibold mt-1">Payment Option:</h3>
          <div className="flex items-center gap-4">
            <img
              src={vo}
              alt="Vodafone"
              className="w-8 h-8"
            />
            <img
              src={i}
              alt="Fawry"
              className="w-8 h-8"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="pt-4 border-t border-gray-700">
          <h3 className="text-lg text-left font-semibold mb-3">About This Item</h3>
          <p className="text-gray-300 leading-relaxed text-left text-sm max-w-8xl">
            {product.description}
          </p>
        </div>

        {/* Flavors Section */}
        <div>
          <h3 className="text-lg text-left font-semibold mt-8 mb-4">FLAVORS</h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
            {product.flavors.map((flavor) => (
              <div
                key={flavor.id}
                className="bg-white rounded-lg py-3 flex justify-center items-center hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={flavor.image}
                  alt="Flavor"
                  className="w-16  object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
     <Suggestions/>
     <Offers/>
     <New/>
    </>
  );
}
