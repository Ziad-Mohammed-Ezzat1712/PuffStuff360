// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Shape from "../shape/shape";
import vo from "../../assets/Images/vo.png";
import i from "../../assets/Images/in.png";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext1.jsx";
import { LuWallet } from "react-icons/lu";

export default function PaymentPage() {
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

  const [selected, setSelected] = useState(null);

  const handleClick = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const base =
    "flex items-center gap-3 px-4 font-medium py-2 rounded-xl transition-all";
  const unselected =
    "bg-transparent border border-black text-black hover:bg-[#790000] hover:text-white hover:border-transparent";
  const selectedClass = "bg-[#790000] text-white border-transparent";

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 text-[#ffffff] text-center">
        Your Shopping Cart
      </h2>

      <Shape />

      <div className="grid grid-cols-2 container mx-auto">
        {/* Payment Section */}
        <div className="bg-white container mx-auto max-w-4xl rounded-xl mt-20">
          <h1 className="py-10 text-[25px] font-semibold">
            Select Payment method
          </h1>

          <div className="flex justify-center gap-4 pb-6">
            <button
              type="button"
              onClick={() => handleClick("wallet")}
              aria-pressed={selected === "wallet"}
              className={` px-14 ${base} ${
                selected === "wallet" ? selectedClass : unselected
              }`}
            >
              <LuWallet size={36} />
              Wallet
            </button>

            <button
              type="button"
              onClick={() => handleClick("instapay")}
              aria-pressed={selected === "instapay"}
              className={`${base} ${
                selected === "instapay" ? selectedClass : unselected
              } px-8`}
            >
              <img src={i} alt="instapay" className="h-12" />
              Instapay
            </button>
          </div>

          {/* 👇 Transfer Details */}
          {selected && (
            <div className="px-10 pb-6 text-center">
              <h2 className="text-lg font-semibold text-[#790000] mb-2">
                Transfer Details
              </h2>

              <p className="text-black text-[16px] mb-2">
                Please transfer the total amount to the following number:
              </p>

              <h1 className="text-xl font-bold text-black mb-3">
                {selected === "instapay"
                  ? "01123640548"
                  : "01228837155"}
              </h1>

              <p className="text-gray-600 text-sm leading-relaxed">
                Kindly transfer the full amount (
                <span className="font-semibold">
                  {total + Delivery} EG
                </span>
                ) via{" "}
                {selected === "instapay" ? "Instapay" : "Wallet"} and keep a
                screenshot of the transaction for confirmation.
              </p>
            </div>
          )}

         
          {/* <div className="mb-4 px-10 font-medium">
            <h1>Please enter the mobile number</h1>
            <h1 className="mb-2">
              from which the transfer will be made.
            </h1>
            <input
              type="text"
              className="bg-[#E6E6E6] w-full rounded-2xl h-14 px-4 mt-2"
              placeholder="EX:01023456789"
            />
          </div> */}

          {/* Buttons */}
          <div className="flex justify-center gap-4 pb-10 pt-4">
            <Link to="/cart">
              <button className="flex items-center gap-3 bg-transparent border border-black px-20 font-medium text-black py-2 rounded-xl hover:bg-[#790000] hover:text-white hover:border-transparent">
                Back
              </button>
            </Link>

            <Link to="/shippingpage">
              <button className="flex items-center gap-3 bg-[#790000] hover:bg-transparent hover:border hover:border-black px-12 font-medium text-white hover:text-black py-2 rounded-xl">
                continuation
              </button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 container mx-auto max-w-xl rounded-2xl shadow-lg h-fit sticky mt-20">
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

        {/* Security */}
        <div className="mt-[20px] flex justify-center items-center gap-5">
          <LockKeyhole size={32} className="text-[#A59F9F]" />
          <h1 className="text-[#C4C4C4] text-[18px] mt-2">
            All transactions are secure and encrypted.
          </h1>
        </div>
      </div>
    </>
  );
}