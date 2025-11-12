import React, { useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import Shape from "../shape/shape.jsx";
import { Link } from "react-router-dom";
export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // حساب Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <>
        <h1 className="text-left text-[28px] font-semibold">Your cart</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Products List */}
          
          <div className="md:col-span-2 space-y-6 bg-white rounded-xl p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className=" relative p-4 flex flex-col sm:flex-row sm:items-center gap-4 border-b"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-contain rounded-lg mx-auto sm:mx-0 bg-[#E8E8E8] p-4"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl text-black font-semibold">{item.name}</h3>

                  
                  <p className="text-black mt-1">
                    Nic:{" "}
                    <span className="text-gray-400 font-medium">
                       3
                    </span>
                  </p>
                  <p className="text-black mt-1">
                    Size:{" "}
                    <span className="text-gray-400 font-medium">
                       100 ML
                    </span>
                  </p>
                  <p className="text-black mt-1">
                    Flavor:{" "}
                    <span className="text-gray-400 font-medium">
                       Blue Ice
                    </span>
                  </p>


            

                  <p className="text-[#6D6D6D] mt-2 font-medium">
                  
                    <span className="text-[#000000] font-medium">
                       {(item.price * item.quantity)} EG
                    </span>
                  </p>
                </div>

           <div className=" absolute left-[84%] top-[60%] flex gap-4  ">
              
                      <div className="flex bg-[#E8E8E8] py-2 px-4 rounded-xl justify-between sm:justify-between items-center gap-4 mt-3 ">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="  px-1.5 py-0 rounded-full border-2  border-black  text-black text-lg"
                    >
                     <i class="fa-solid fa-minus"></i>
                    </button>
                    <span className="text-2xl font-medium px-2 text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-1.5 py-0 rounded-full border-2 border-black  text-black text-lg"
                    >
                 <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
   <button
                  onClick={() => removeFromCart(item.id)}
                  className=" hover:bg-[#790000] hover:text-white px-2 top-[-230%] left-[82%] absolute  mt-5 rounded-lg text-black border border-gray-400 h-8 font-medium self-center sm:self-auto transition"
                >
               <i class="fa-regular fa-trash-can text-md "></i>
                </button>
           </div>
             
              </div>
            ))}
            <Link to="/shippingpage" className="text-white hover:text-white">
            <button className="bg-[#790000] hover:bg-[#8b0101] w-full py-4 rounded-xl font-semibold">Continue to pay</button></Link>
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
                {subtotal} EG
              </span>
            </div>
             <div className="flex justify-between text-[#6D6D6D] text-lg mb-3">
              <span>Discount (10%)</span>
              <span className="text-[#790000] font-semibold">
                 {subtotal} EG
              </span>
            </div>
             <div className="flex justify-between border-b-2 pb-3 text-[#6D6D6D] text-lg mb-3">
              <span>Delivery</span>
              <span className="text-black font-semibold">
               {subtotal} EG
              </span>
            </div>
           
            <div className="flex justify-between text-[#000000] text-xl font-medium ">
              <span>Total</span>
              <span className="text-[#000000]">
 {subtotal} EG  
              </span>
            </div>

          </div>
        </div>
        </>
      )}
    
    </div>
  );
}
  