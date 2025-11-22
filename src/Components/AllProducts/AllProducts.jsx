import React, { useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import Shape from "../shape/shape.jsx";
import toast from "react-hot-toast";
import { FiPhoneCall } from 'react-icons/fi';  
import { FaEnvelope, FaUserAlt, FaCity, FaMapMarkerAlt } from "react-icons/fa";
import blue from "../../assets/Images/blueice.webp";
import { Heart } from "lucide-react";
import Device1 from "../../assets/Images/device1.png";
import Device2 from "../../assets/Images/device2.png";
  
export default function AllProducts() {

    const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  const products = [
    {
      id: 1,
      name: "Splash", // لاحظ غيرنا title → name
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 2,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 3,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 4,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 5,
      name: "Splash", // لاحظ غيرنا title → name
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 6,
      name: "Splash", // لاحظ غيرنا title → name
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 7,
      name: "Splash", // لاحظ غيرنا title → name
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
    {
      id: 8,
      name: "Splash", // لاحظ غيرنا title → name
      desc: "Blue ice - Black currant & Grapes",
      price: 200,
      rating: 4.6,
      image: blue,
    },
      {
          id: 9,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device1,
        },
        {
          id: 10,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device2,
        },
        {
          id: 11,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device1,
        },
        {
          id: 12,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device2,
        },
            {
          id: 13,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device1,
        },
        {
          id: 14,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device2,
        },
        {
          id: 15,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device1,
        },
        {
          id: 16,
          name: "Splash",
          desc: "Blue ice - Black currant & Grapes",
          price: "200 EG",
          rating: 4.6,
          image: Device2,
        },
      
  ];

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

     <h2 className="text-[50px]  mb-24 text-[#ffffff] text-center">
       Our Products
      </h2>

   <div className="flex justify-end items-center gap-3 mb-4">

  <h1 className="text-gray-300   text-right font-medium">Sort by</h1>

  <select
    name="sort"
    className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-[#4E0000] cursor-pointer"
  >
    <option value="">Select</option>
    <option value="best">Best Seller</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
    <option value="new">Newest</option>
  </select>

</div>

         <div className="grid md:grid-cols-[20%_80%] gap-8">

             {/* Filters */}
              <div className="bg-[#ffffff] p-6 hidden md:block rounded-2xl shadow-lg h-fit sticky top-20">

  {/* Title */}
  <h3 className="text-xl font-semibold text-left text-gray-900 mb-4">Filters</h3>

  <hr className="mb-4" />

  {/* Categories */}
  <div className="space-y-3 text-gray-700 text-base">
    {[
      "LIQUID",
      "PODS",
      "TANK",
      "DIPOSABLE",
      "COILS & CARTRIDGE",
      "MOD",
      "FYLL KITS",
      "Accessoire",
    ].map((item) => (
      <div key={item} className="flex justify-between items-center cursor-pointer">
        <span>{item}</span>
        <span className="text-gray-500">{">"}</span>
      </div>
    ))}
  </div>

  <hr className="my-4" />

  {/* Size */}
  <div className="mb-5">
    <h4 className="font-semibold text-left text-gray-900 mb-3">Size</h4>
    <div className="flex gap-3">
      {[30, 60, 100].map((size) => (
        <button
          key={size}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 border hover:bg-gray-200"
        >
          {size}
        </button>
      ))}
    </div>
  </div>

  <hr className="my-4" />

  {/* NIC */}
  <div className="mb-5">
    <h4 className="font-semibold text-left text-gray-900 mb-3">NIC</h4>
    <div className="flex flex-wrap gap-3">
      {[3, 6, 8, 12, 50].map((nic) => (
        <button
          key={nic}
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 border hover:bg-gray-200"
        >
          {nic}
        </button>
      ))}
    </div>
  </div>

  <hr className="my-4" />

  {/* Colors */}
  <div>
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold text-gray-900">Colors</h4>
      <span className="text-gray-700 cursor-pointer">⌄</span>
    </div>

    <div className="flex flex-wrap gap-3">
      {["#ff6b6b", "#ff9f43", "#1dd1a1", "#48dbfb", "#00d2d3", "#341f97", "#ff9ff3", "#5f27cd"].map(
        (color) => (
          <button
            key={color}
            className="w-7 h-7 rounded-full border"
            style={{ backgroundColor: color }}
          ></button>
        )
      )}
    </div>
  </div>

  {/* Apply Button */}
  <button className="w-full mt-6 bg-[#4E0000] text-white py-3 rounded-full hover:bg-[#5a0202] transition">
    Apply Filter
  </button>
</div>

              {/* Products List */}
              
              <div className="grid md:grid-cols-3 gap-8">
                
      {products.map((product) => (
             <div
               key={product.id}
               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group relative hover:scale-105"
             >
               {/* Image */}
               <Link to={`/product/${product.id}`}>
                 <div className="flex justify-center items-center h-72 bg-gray-100">
                   <img
                     src={product.image}
                     alt={product.name}
                     className="h-52 object-contain transition-transform duration-500 ease-in-out hover:animate-tilt"
                   />
                 </div>
               </Link>
   
               {/* Content */}
               <div className="p-4 rounded-t-2xl space-y-4">
                 <h3 className="text-lg text-left font-semibold text-black mb-1">
                   {product.name}
                 </h3>
                 <p className="text-gray-500 text-left text-sm mb-3">
                   {product.desc}
                 </p>
   
                 {/* Price & Rating */}
                 <div className="flex items-center justify-between mb-3">
                   <span className="font-bold text-black text-base">
                     EGP {product.price}
                   </span>
                   <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                     <span>★</span><span>★</span><span>★</span><span>★</span>
                     <span className="text-gray-300">★</span>
                     <span className="text-gray-600 text-xs ml-1">
                       {product.rating}
                     </span>
                   </div>
                 </div>
   
                 {/* Buttons */}
                 <div className="flex items-center justify-between gap-2">
                   <button className="w-[50%] border border-[#A59F9F] hover:bg-[#4E0000] text-[#A59F9F] hover:text-white py-2 rounded-lg transition">
                     Buy Now
                   </button>
   
                   <button
                     onClick={() => handleAddToCart(product)}
                     disabled={loadingId === product.id}
                     className={`w-[50%] py-2 rounded-lg transition text-white ${
                       loadingId === product.id
                         ? "bg-gray-400 cursor-not-allowed"
                         : "bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000]"
                     }`}
                   >
                     {loadingId === product.id ? "Adding..." : "Add to Cart"}
                   </button>
   
                   
                   <button className="w-10 h-10 border border-[#A59F9F] rounded-lg flex items-center justify-center bg-transparent transition">
                     <Heart size={20} className="text-[#A59F9F]" />
                   </button>
                 </div>
               </div>
             </div>
           ))}
           
              </div>
              
    
           
            </div>
    </>
  )
}
