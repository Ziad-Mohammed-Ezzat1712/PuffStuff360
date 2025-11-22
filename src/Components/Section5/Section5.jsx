//Devices section
import React, { useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import Device1 from "../../assets/Images/device1.png";
import Device2 from "../../assets/Images/device2.png";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function Section2() {
 const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  const products = [
    {
      id: 1,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device1,
    },
    {
      id: 2,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device2,
    },
    {
      id: 3,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device1,
    },
    {
      id: 4,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device2,
    },
        {
      id: 5,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device1,
    },
    {
      id: 6,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device2,
    },
    {
      id: 7,
      name: "Splash",
      desc: "Blue ice - Black currant & Grapes",
      price: "200 EG",
      rating: 4.6,
      image: Device1,
    },
    {
      id: 8,
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
    <section className="px-4 py-10">
      <h2 className="text-white text-left text-3xl font-bold mb-8">Devices</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group relative hover:scale-105 md:hover:scale-110"
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
            <div className="p-4 rounded-t-2xl space-y-5">
              <h3 className="text-lg text-left font-semibold text-black mb-1">
                {product.name}
              </h3>
              <p className="text-gray-500 text-left text-sm mb-3">
                {product.desc}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-black text-base">
                  {product.price}
                </span>
                <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
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
    </section>
  );
}
