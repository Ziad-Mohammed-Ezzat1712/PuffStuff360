import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext1';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ممكن تخزن البيانات في localStorage لو حبيت
    localStorage.setItem('orderData', JSON.stringify({ ...form, cartItems }));

    clearCart();
    navigate('/order-confirmation');
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
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-green-500 text-center">Checkout</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-600"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-600"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-600"
        />

        <div className="text-gray-300">
          Total: <span className="text-white">EGP {total.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-bold"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
}
