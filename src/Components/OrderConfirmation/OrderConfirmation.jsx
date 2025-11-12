import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const fakeOrderId = Math.floor(100000 + Math.random() * 900000); // رقم عشوائي

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-3xl font-bold text-green-500 mb-4">Thank You!</h2>
      <p className="text-lg text-center text-gray-300 mb-2">
        Your order has been placed successfully.
      </p>
      <p className="text-sm text-gray-500 mb-6">Order ID: #{fakeOrderId}</p>

      <Link
        to="/"
        className="bg-[#FD0000] hover:bg-red-700 text-white px-6 py-2 rounded font-bold"
      >
        Back to Home
      </Link>
    </div>
  );
}
