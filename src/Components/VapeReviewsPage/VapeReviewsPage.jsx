// VapeReviewsPage.jsx
import React, { useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";import { FaStar } from "react-icons/fa";
import img1 from "../../../images/prod1.png";
import img2 from "../../../images/prod2.png";
import img3 from "../../../images/prod3.png";
import img4 from "../../../images/prod4.png";

export default function VapeReviewsPage() {
  const reviews = [
    {
      id: 1,
      product: "HorizonTech - Binaries Cabin Disposable | 6000 puffs | 15mL",
      image: img1,
      rating: 5,
      review:
        "One of the smoothest draws I've had. Great flavor that lasts till the very end. Perfect for daily vaping.",
    },
    {
      id: 2,
      product: "HorizonTech Binaries Cabin Disposable SV | 15000 Puffs | 20mL",
      image: img2,
      rating: 4,
      review:
        "Excellent battery life and smooth inhale. A bit strong for beginners but amazing for experienced users.",
    },
    {
      id: 3,
      product: "TYSON 2.0 Heavyweight Disposable | 15000 Puffs",
      image: img3,
      rating: 5,
      review:
        "Amazing taste with a bold punch. Tyson really delivered a knockout vape experience!",
    },
    {
      id: 4,
      product: "Binaries Cabin TH6000 Disposable | 6000 Puffs | 12mL | 50mg",
      image: img4,
      rating: 4,
      review:
        "Good performance for its price. Compact design and strong nicotine hit. Ideal for quick sessions.",
    },
    {
      id: 5,
      product: "Mint Chill E-Liquid | 60mL | 3mg",
      image: img2,
      rating: 5,
      review:
        "Cool, refreshing, and just the right amount of sweetness. My go-to juice for the summer.",
    },
    {
      id: 6,
      product: "Berry Blast E-Liquid | 60mL | 6mg",
      image: img1,
      rating: 4,
      review:
        "Fruity and vibrant flavor. Could use a bit more cooling, but still very enjoyable.",
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
    <section className="bg-black text-white min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Vape Product Reviews</h1>
      <p className="text-lg mb-8 text-gray-300">
        Honest reviews and feedback from real users about the latest vaping products.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] p-6 rounded-lg border border-gray-700 hover:shadow-lg space-y-4 transition duration-300"
          >
            <img
              src={item.image}
              alt={item.product}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold mb-2 ">{item.product}</h2>
            <div className="flex text-yellow-400 mb-3 justify-center">
              {Array(item.rating)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
            <p className="text-gray-300">{item.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
