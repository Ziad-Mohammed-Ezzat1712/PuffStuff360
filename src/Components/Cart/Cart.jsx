import React, { useEffect } from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import Shape from "../shape/shape.jsx";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function Cart() {
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

  useEffect(() => {
    console.log("🛒 cartItems updated:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log("📊 cartSummary:", cartSummary);
  }, [cartSummary]);

  return (
    <div className="text-white min-h-screen px-4 md:px-6 py-10 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
        Your Shopping Cart
      </h2>

      <Shape />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-12 py-20">
          <p className="text-center text-gray-400 text-3xl md:text-4xl">
            Your cart is empty.
          </p>
          <Link
            to="/products"
            className="flex items-center gap-4 text-white text-2xl md:text-3xl hover:text-red-700"
          >
            Go To Shopping <FaShoppingCart />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="md:col-span-2 space-y-6 bg-white rounded-xl p-6 shadow-lg">
            {cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 relative"
              >
                {/* Image */}
                <img
                  src={item.variant.image}
                  alt={item.product?.name_en}
                  className="w-full sm:w-40 h-60 object-cover rounded-lg bg-gray-100 p-2 mx-auto sm:mx-0"
                />

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-black">
                    {item.product?.name_en}
                  </h3>
                  <p className="text-black mt-1">
                    Nic:{" "}
                    <span className="font-medium text-black">
                      {item.variant?.variant_info?.nicotine || "-"}
                    </span>
                  </p>
                  <p className="text-black mt-1">
                    Size:{" "}
                    <span className="font-medium text-black">
                      {item.variant?.variant_info?.size || "-"}
                    </span>
                  </p>
                  <p className="text-black mt-1">
                    Flavor:{" "}
                    <span className="font-medium text-black">
                      {item.variant?.variant_info?.flavor || "-"}
                    </span>
                  </p>
                  <p className="text-black font-medium mt-2 text-lg">
                    {item.line_total} EG
                  </p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-3 sm:mt-0">
                  <div className="flex items-center bg-gray-200 rounded-xl gap-2 px-3 py-2">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="px-3 py-1 text-lg font-bold text-black rounded-full border border-gray-400"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-black">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="px-3 py-1 text-lg font-bold text-black rounded-full border border-gray-400"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-600 text- hover:text-white hover:bg-red-700 px-3 py-2 rounded-lg border border-red-600 transition"
                  >
<MdDelete  size={24}/>
                  </button>
                </div>
              </div>
            ))}

            <Link to="/shippingpage" className="block mt-6">
              <button className="w-full bg-red-800 hover:bg-red-900 text-white py-4 rounded-xl font-semibold transition">
                Continue to pay
              </button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-6">
            <h3 className="text-2xl font-medium text-black mb-4">
              Order Summary
            </h3>

            {/* Coupon */}
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

            {/* Subtotal */}
            <div className="flex justify-between text-gray-600 text-lg mb-2">
              <span>Subtotal</span>
              <span className="text-black font-semibold">{subtotal} EG</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between text-gray-600 text-lg mb-2">
                <span>Discount</span>
                <span className="text-red-700 font-semibold">{discount} EG</span>
              </div>
            )}

            {/* Delivery */}
            <div className="flex justify-between text-gray-600 text-lg mb-2 border-b-2 pb-2">
              <span>Delivery</span>
              <span className="text-black font-semibold">0 EG</span>
            </div>

            {/* Total */}
            <div className="flex justify-between text-black text-xl font-medium mt-3">
              <span>Total</span>
              <span>{total} EG</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}