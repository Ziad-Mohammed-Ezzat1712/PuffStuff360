import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import Shape from "../shape/shape.jsx";

import { FiPhoneCall } from "react-icons/fi";
import { FaEnvelope, FaUserAlt, FaCity, FaMapMarkerAlt } from "react-icons/fa";

import axios from "axios";
import toast from "react-hot-toast";

export default function ShippingPage() {
    const {
      cartItems,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      couponCode,
      setCouponCode,
      discount,
      applyCoupon,
      cartSummary,
    } = useCart();
  
    const subtotal = cartSummary?.subtotal || 0;
    const total = subtotal - discount;
    const Delivery = 60;
  
    useEffect(() => {
      console.log("🛒 cartItems updated:", cartItems);
    }, [cartItems]);
  
    useEffect(() => {
      console.log("📊 cartSummary:", cartSummary);
    }, [cartSummary]);
  // ✅ states
  const [regions, setRegions] = useState([]);
  const [receiptImage, setReceiptImage] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    shipping_country: "",
    shipping_city: "",
    shipping_address: "",
    shipping_region: "",
    shipping_notes: "",
  });

  const token = localStorage.getItem("userToken");

  // ✅ get regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await axios.get(
          `https://dashboard.splash-e-liquid.com/shipping/getAllShapping.php?nocache=${Date.now()}`
        );

        if (res.data.status) {
          setRegions(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRegions();
  }, []);

  // ✅ handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ checkout with toast 🔥
  const handleCheckout = async () => {
    const loadingToast = toast.loading("Processing your order...");

    try {
      const form = new FormData();

      // shipping data
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      // payment
      form.append("payment_method", "instapay");
      form.append("wallet_phone", formData.phone);
      form.append("transaction_no", formData.phone);

      // products
      if (cartItems) {
        form.append("products", JSON.stringify(cartItems));
      }

      // image
      if (receiptImage) {
        form.append("receipt_image", receiptImage);
      }

      const res = await axios.post(
        "https://dashboard.splash-e-liquid.com/orders/checkOut.php",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss(loadingToast);

      if (res.data.status) {
        toast.success(res.data.message || "Order placed successfully ✅");
      } else {
        toast.error(res.data.message || "Something went wrong ❌");
      }

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Checkout failed ❌");
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="text-white min-h-screen px-6 py-10 container mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Your Shopping Cart
      </h2>

      <Shape />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left */}
        <div className="md:col-span-2 space-y-6 bg-white rounded-xl p-6">
          <h1 className="text-black text-[25px] font-semibold">
            Shipping and contact information
          </h1>

          <div className="space-y-4 w-full">

            {/* Full Name */}
            <label className="flex gap-2 text-black">
              <FaUserAlt /> Full Name
            </label>
            <input name="full_name" onChange={handleChange} className="border p-3 w-full h-[60px] rounded-xl bg-[#F3F3F5]" />

            {/* Email */}
            <label className="flex gap-2 text-black">
              <FaEnvelope /> Email
            </label>
            <input name="email" onChange={handleChange} className="border p-3 w-full h-[60px] rounded-xl bg-[#F3F3F5]" />

            {/* Phone */}
            <label className="flex gap-2 text-black">
              <FiPhoneCall /> Phone
            </label>
            <input name="phone" onChange={handleChange} className="border p-3 w-full h-[60px] rounded-xl bg-[#F3F3F5]" />

            {/* City + Country */}
            <div className="grid grid-cols-2 gap-3">
              <input name="shipping_city" placeholder="City" onChange={handleChange} className="border p-3 h-[60px] rounded-xl bg-[#F3F3F5]" />
              <input name="shipping_country" placeholder="Country" onChange={handleChange} className="border p-3 h-[60px] rounded-xl bg-[#F3F3F5]" />
            </div>

            {/* Region */}
            <select
              name="shipping_region"
              onChange={handleChange}
              className="border p-3 w-full h-[60px] rounded-xl bg-[#F3F3F5]"
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.region_en}>
                  {region.region_en}
                </option>
              ))}
            </select>

            {/* Address */}
            <textarea
              name="shipping_address"
              placeholder="Address"
              onChange={handleChange}
              className="border p-3 rounded-xl bg-[#F3F3F5] w-full h-32"
            />

            {/* Notes */}
            <textarea
              name="shipping_notes"
              placeholder="Notes"
              onChange={handleChange}
              className="border p-3 rounded-xl bg-[#F3F3F5] w-full h-24"
            />

            {/* Upload Image */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReceiptImage(e.target.files[0])}
              className="border p-3 w-full rounded-xl bg-[#F3F3F5]"
            />

            {/* Preview */}
            {receiptImage && (
              <img
                src={URL.createObjectURL(receiptImage)}
                alt="preview"
                className="w-32 rounded-lg"
              />
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleCheckout}
            className="bg-[#790000] hover:bg-[#850101] w-full py-4 rounded-2xl"
          >
            Continue to pay
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-20">
           <h3 className="text-2xl font-medium text-black mb-4">
            Order Summary
          </h3>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 text-black"
            />
            <button
              onClick={applyCoupon}
              className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg transition"
            >
              Apply
            </button>
          </div>

          <div className="flex justify-between text-gray-600 text-lg mb-2">
            <span>Subtotal</span>
            <span className="text-black font-semibold">{subtotal} EG</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-gray-600 text-lg mb-2">
              <span>Discount</span>
              <span className="text-red-700 font-semibold">
                {discount} EG
              </span>
            </div>
          )}

          <div className="flex justify-between text-gray-600 text-lg mb-2 border-b-2 pb-2">
            <span>Delivery</span>
            <span className="text-black font-semibold">{Delivery} EG</span>
          </div>

          <div className="flex justify-between text-black text-xl font-medium mt-3">
            <span>Total</span>
            <span>{total + Delivery} EG</span>
          </div>

          <h1 className="text-black mt-6">
            Note: Delivery is currently available in Cairo only.
          </h1>
        </div>
      </div>
    </div>
  );
}