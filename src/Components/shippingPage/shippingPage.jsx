import React, { useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";import { Link } from "react-router-dom";
import Shape from "../shape/shape.jsx";

import { FiPhoneCall } from 'react-icons/fi';  
import { FaEnvelope, FaUserAlt, FaCity, FaMapMarkerAlt } from "react-icons/fa";
  

export default function ShippingPage() {
  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className=" text-white min-h-screen px-6 py-10 container mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-[#ffffff] text-center">
        Your Shopping Cart
      </h2>
<Shape/>

     <div className="grid md:grid-cols-3 gap-8">
          {/* Products List */}
          
          <div className="md:col-span-2 space-y-6 bg-white rounded-xl p-6">
            
     <h1 className="text-black text-[25px] font-semibold">Shipping and contact information</h1>
       <div className="flex-1 space-y-4 sm:space-y-6 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] text-left font-bold">
            Billing Address
          </h2>

        
            <label className=" flex gap-2 text-black text-left text-lg sm:text-xl lg:text-[25px] mb-1">
          <FaUserAlt className="mt-1 text-[#6A7282]" size={18} aria-hidden="true" /> Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="border p-3  w-full h-[50px] sm:h-[60px] lg:h-[80px] rounded-xl bg-[#F3F3F5]"
          />

      


          <label className="flex gap-2 text-black text-left text-lg sm:text-xl lg:text-[25px] mb-1">
          <FaEnvelope className=" mt-1 text-[#6A7282]" size={18} aria-hidden="true" />   E-mail
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="border p-3 rounded-xl  w-full h-[50px] sm:h-[60px] lg:h-[80px]  bg-[#F3F3F5]"
          />
  <label className="flex gap-2 text-black   text-left text-lg sm:text-xl lg:text-[25px] mb-1">
          <FiPhoneCall className=" mt-1 text-[#6A7282]" size={18} aria-hidden="true" /> Phone 
          </label>
          <input
            type="text"
            name="phone"
           
            placeholder="01012345678"
            className="border p-3  w-full h-[50px] sm:h-[60px] lg:h-[80px] rounded-xl bg-[#F3F3F5]"
          />

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
            <div className=" flex flex-col"> <label className="flex gap-2 text-black text-left text-lg sm:text-xl lg:text-[25px] mb-1">
          <FaCity className=" mt-1 text-[#6A7282]" size={18} aria-hidden="true" /> City
          </label>
            <input
              type="text"
              placeholder="Cairo"
              className="border p-3 h-[50px] sm:h-[60px] lg:h-[80px] rounded-xl bg-[#F3F3F5] "
            /></div>
             <div className=" flex flex-col"> <label className="flex gap-2 text-black text-left text-lg sm:text-xl lg:text-[25px] mb-1">
        <FaMapMarkerAlt className=" mt-1 text-[#6A7282]" size={18} aria-hidden="true" />   Country
          </label>
            <input
              type="text"
              placeholder="Egypt"
              className="border p-3 h-[50px] sm:h-[60px] lg:h-[80px] rounded-xl bg-[#F3F3F5] "
            /></div></div>
    
          <label className="flex gap-2 text-black  text-left text-lg sm:text-xl lg:text-[25px] mb-1">
          <FaMapMarkerAlt className=" mt-1 text-[#6A7282]" size={18} aria-hidden="true" />  The address in detail
          </label>
          <textarea placeholder="الشارع، رقم البناية، الدور، ومعالم قريبة..." className="border p-3 rounded-xl bg-[#F3F3F5] w-full h-32 sm:h-40 lg:h-48"></textarea>
        </div>
        <Link to="/paymentpage" className="text-white hover:text-white" >
        <button className="bg-[#790000] hover:bg-[#850101] w-full py-4 rounded-2xl">Continue to pay</button>
        </Link>
          </div>

          {/* Cart Summary */}
          <div className="bg-[#ffffff] p-6 rounded-2xl shadow-lg h-fit sticky top-20">
            <h3 className="text-2xl text-left text-black font-medium  pb-3 mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between text-[#6D6D6D] text-lg mb-3 gap-2">
             <div className="relative w-full max-w-sm">
  <span className="absolute inset-y-4 left-4 bottom-3 flex items-center text-gray-400">
    <i className="fa-solid fa-tag"></i>
  </span>
  <input
    type="text"
    placeholder="Coupon code"
    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

             <button
             
              className=" bg-[#790000] hover:bg-red-700 text-white font-normal py-2 px-8 rounded-xl transition"
            >
             Apply
            </button>
            </div>
            <div className="flex justify-between text-[#6D6D6D] text-lg mb-3">
              <span>Subtotal</span>
              <span className="text-[#000000] font-semibold">
               EG
              </span>
            </div>
             <div className="flex justify-between text-[#6D6D6D] text-lg mb-3">
              <span>Discount (10%)</span>
              <span className="text-[#790000] font-semibold">
                 EG
              </span>
            </div>
             <div className="flex justify-between border-b-2 pb-3 text-[#6D6D6D] text-lg mb-3">
              <span>Delivery</span>
              <span className="text-black font-semibold">
               EG
              </span>
            </div>
           
            <div className="flex justify-between text-[#000000] text-xl font-medium ">
              <span>Total</span>
              <span className="text-[#000000]">
  EG  
              </span>
            </div>

          </div>
        </div>
    </div>
  );
}
  