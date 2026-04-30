import React, { useState, useEffect } from "react";
import Shape from "../shape/shape";
import vo from "../../assets/Images/vo.png";
import i from "../../assets/Images/in.png";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext1.jsx";
import { LuWallet } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { useLanguage } from "../../Context/LanguageContext";

export default function PaymentPage() {
  const {
    cartItems,
    couponCode,
    setCouponCode,
    discount,
    applyCoupon,
    cartSummary,
  } = useCart();

  const { isArabic } = useLanguage();

  const subtotal = cartSummary?.subtotal || 0;
  const total = subtotal - discount;
  const Delivery = 60;

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
        {isArabic ? "سلة التسوق" : "Your Shopping Cart"}
      </h2>

      <Shape />

      <div className="grid grid-cols-2 container mx-auto">
        {/* Payment */}
        <div className="bg-white container mx-auto max-w-4xl rounded-xl mt-20">
          <h1 className="py-10 text-[25px] text-center font-semibold">
            {isArabic ? "اختر طريقة الدفع" : "Select Payment Method"}
          </h1>

          <div className="flex justify-center gap-4 pb-6">
            {/* Wallet */}
            <button
              onClick={() => handleClick("wallet")}
              className={`${base} ${
                selected === "wallet" ? selectedClass : unselected
              } px-14`}
            >
              <LuWallet size={36} />
              {isArabic ? "محفظة" : "Wallet"}
            </button>

            {/* Instapay */}
            <button
              onClick={() => handleClick("instapay")}
              className={`${base} ${
                selected === "instapay" ? selectedClass : unselected
              } px-8`}
            >
              <img src={i} alt="instapay" className="h-12" />
              Instapay
            </button>

            {/* COD */}
            <button
              onClick={() => handleClick("cod")}
              className={`${base} ${
                selected === "cod" ? selectedClass : unselected
              } px-10`}
            >
              <MdOutlinePayments size={36} />
              {isArabic ? "الدفع عند الاستلام" : "Cash on Delivery"}
            </button>
          </div>

          {/* Details */}
          {selected && (
            <div className="px-10 pb-6 text-center">
              <h2 className="text-lg font-semibold text-[#790000] mb-2">
                {selected === "cod"
                  ? ""
                  : isArabic
                  ? "تفاصيل التحويل"
                  : "Transfer Details"}
              </h2>

              {selected !== "cod" ? (
                <>
                  <p className="text-black text-[16px] mb-2">
                    {isArabic
                      ? "قم بتحويل المبلغ إلى الرقم التالي:"
                      : "Please transfer the total amount to:"}
                  </p>

                  <h1 className="text-xl font-bold text-black mb-3">
                    {selected === "instapay"
                      ? "01123640548"
                      : "01228837155"}
                  </h1>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {isArabic ? (
                      <>
                        قم بتحويل مبلغ{" "}
                        <span className="font-semibold">
                          {total + Delivery} EG
                        </span>{" "}
                        واحتفظ بصورة التحويل
                      </>
                    ) : (
                      <>
                        Transfer{" "}
                        <span className="font-semibold">
                          {total + Delivery} EG
                        </span>{" "}
                        and keep screenshot
                      </>
                    )}
                  </p>
                </>
              ) : (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isArabic
                    ? `هتدفع ${total + Delivery} EG عند الاستلام`
                    : `You will pay ${total + Delivery} EG upon delivery`}
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 pb-10 pt-4">
            <Link to="/cart">
              <button className="flex items-center gap-3 bg-transparent border border-black px-20 font-medium text-black py-2 rounded-xl hover:bg-[#790000] hover:text-white hover:border-transparent">
                {isArabic ? "رجوع" : "Back"}
              </button>
            </Link>

            <Link to="/shippingpage">
              <button className="flex items-center gap-3 bg-[#790000] hover:bg-transparent hover:border hover:border-black px-12 font-medium text-white hover:text-black py-2 rounded-xl">
                {isArabic ? "استمرار" : "Continue"}
              </button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 container mx-auto max-w-xl rounded-2xl shadow-lg h-fit sticky mt-20">
          <h3 className="text-2xl font-medium text-center text-black mb-4">
            {isArabic ? "ملخص الطلب" : "Order Summary"}
          </h3>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder={isArabic ? "كود الخصم" : "Coupon code"}
              className="flex-1 border rounded-lg px-4 py-2 text-black"
            />
            <button
              onClick={applyCoupon}
              className="bg-red-800 text-white px-6 py-2 rounded-lg"
            >
              {isArabic ? "تطبيق" : "Apply"}
            </button>
          </div>

          <div className="flex justify-between text-lg mb-2">
            <span>{isArabic ? "المجموع" : "Subtotal"}</span>
            <span>{subtotal} EG</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-lg mb-2">
              <span>{isArabic ? "الخصم" : "Discount"}</span>
              <span className="text-red-700">{discount} EG</span>
            </div>
          )}

          <div className="flex justify-between text-lg mb-2 border-b-2 pb-2">
            <span>{isArabic ? "التوصيل" : "Delivery"}</span>
            <span>{Delivery} EG</span>
          </div>

          <div className="flex justify-between text-xl font-medium mt-3">
            <span>{isArabic ? "الإجمالي" : "Total"}</span>
            <span>{total + Delivery} EG</span>
          </div>

          <h1 className="mt-6 text-black">
            {isArabic
              ? "ملحوظة: التوصيل متاح داخل القاهرة فقط"
              : "Note: Delivery available in Cairo only"}
          </h1>
        </div>

        {/* Security */}
        <div className="mt-[20px] flex justify-center items-center gap-5">
          <LockKeyhole size={32} className="text-[#A59F9F]" />
          <h1 className="text-[#C4C4C4] text-[18px] mt-2">
            {isArabic
              ? "جميع المعاملات آمنة ومشفرة"
              : "All transactions are secure and encrypted"}
          </h1>
        </div>
      </div>
    </>
  );
}