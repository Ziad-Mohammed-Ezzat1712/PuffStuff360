// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext1.jsx";
import Shape from "../shape/shape.jsx";

import { FiPhoneCall } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";

import axios from "axios";
import toast from "react-hot-toast";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom"; // ✅ مهم

export default function ShippingPage() {
  const {
    cartItems,
    couponCode,
    setCouponCode,
    discount,
    applyCoupon,
    cartSummary,
  } = useCart();

  const { isArabic } = useLanguage();
  const navigate = useNavigate(); // ✅ مهم

  const subtotal = cartSummary?.subtotal || 0;
  const total = subtotal - discount;
  const Delivery = 60;

  const [regions, setRegions] = useState([]);
  const [receiptImage, setReceiptImage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    wallet_phone: "",
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
          `https://dashboard.splash-e-liquid.com/shipping/getAllShapping.php?nocache=${Date.now()}`,
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

  // ✅ امسح الصورة لو COD
  useEffect(() => {
    if (paymentMethod === "cod") {
      setReceiptImage(null);
    }
  }, [paymentMethod]);

  // ✅ handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ checkout
  const handleCheckout = async () => {
    const loadingToast = toast.loading(
      isArabic ? "جاري تنفيذ الطلب..." : "Processing your order...",
    );

    try {
      if (!paymentMethod) {
        toast.dismiss(loadingToast);
        toast.error(isArabic ? "اختار طريقة الدفع" : "Select payment method");
        return;
      }

      if (paymentMethod !== "cod") {
        if (!formData.wallet_phone) {
          toast.dismiss(loadingToast);
          toast.error(isArabic ? "ادخل رقم التحويل" : "Enter transfer phone");
          return;
        }

        if (!receiptImage) {
          toast.dismiss(loadingToast);
          toast.error(isArabic ? "ارفع صورة التحويل" : "Upload receipt image");
          return;
        }
      }

      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      form.append("payment_method", paymentMethod);

      if (paymentMethod !== "cod") {
        form.append("wallet_phone", formData.wallet_phone);
        form.append("transaction_no", formData.wallet_phone);
      }

      if (cartItems) {
        form.append("products", JSON.stringify(cartItems));
      }

      if (receiptImage && paymentMethod !== "cod") {
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
        },
      );

      toast.dismiss(loadingToast);

      if (res.data.status) {
        toast.success(
          res.data.message ||
            (isArabic ? "تم الطلب بنجاح ✅" : "Order placed successfully ✅"),
        );

        // 🔥 التحويل لصفحة confirmation
        setTimeout(() => {
          navigate("/confirmation", {
            state: {
              orderData: res.data,
              total: total + Delivery,
            },
          });
        }, 1000);
      } else {
        toast.error(
          res.data.message ||
            (isArabic ? "حدث خطأ ❌" : "Something went wrong ❌"),
        );
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(isArabic ? "فشل الطلب ❌" : "Checkout failed ❌");
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="text-white min-h-screen px-6 py-10 container mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">
        {isArabic ? "سلة التسوق" : "Your Shopping Cart"}
      </h2>

      <Shape />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-7 bg-white rounded-xl p-6">
          <h1 className="text-black text-center text-[25px] font-semibold">
            {isArabic
              ? "معلومات الشحن والتواصل"
              : "Shipping and contact information"}
          </h1>
          <div className="space-y-4 w-full">
            {" "}
            {/* Full Name */}{" "}
            <label className="flex gap-2 text-black">
              {" "}
              <FaUserAlt /> {isArabic ? "الاسم بالكامل" : "Full Name"}{" "}
            </label>{" "}
            <input
              name="full_name"
              onChange={handleChange}
              className="border p-3 w-full h-[60px] text-black rounded-xl bg-[#F3F3F5]"
            />{" "}
            {/* Email */}{" "}
            <label className="flex gap-2 text-black">
              {" "}
              <FaEnvelope /> {isArabic ? "البريد الإلكتروني" : "Email"}{" "}
            </label>{" "}
            <input
              name="email"
              onChange={handleChange}
              className="border p-3 w-full h-[60px] text-black rounded-xl bg-[#F3F3F5]"
            />{" "}
            {/* Phone */}{" "}
            <label className="flex gap-2 text-black">
              {" "}
              <FiPhoneCall /> {isArabic ? "رقم الهاتف" : "Phone"}{" "}
            </label>{" "}
            <input
              name="phone"
              onChange={handleChange}
              className="border p-3 w-full text-black h-[60px] rounded-xl bg-[#F3F3F5]"
            />{" "}
            {/* City + Country */}{" "}
            <div className="grid grid-cols-2 gap-3">
              {" "}
              <input
                name="shipping_city"
                placeholder={isArabic ? "المدينة" : "City"}
                onChange={handleChange}
                className="border p-3 h-[60px] text-black rounded-xl bg-[#F3F3F5]"
              />{" "}
              <input
                name="shipping_country"
                placeholder={isArabic ? "الدولة" : "Country"}
                onChange={handleChange}
                className="border p-3 h-[60px] text-black rounded-xl bg-[#F3F3F5]"
              />{" "}
            </div>{" "}
            {/* Region */}{" "}
            <select
              name="shipping_region"
              onChange={handleChange}
              className="border p-3 w-full h-[60px] text-black rounded-xl bg-[#F3F3F5]"
            >
              {" "}
              <option value="">
                {" "}
                {isArabic ? "اختر المنطقة" : "Select Region"}{" "}
              </option>{" "}
              {regions.map((region) => (
                <option key={region.id} value={region.region_en}>
                  {" "}
                  {region.region_en}{" "}
                </option>
              ))}{" "}
            </select>{" "}
            {/* Address */}{" "}
            <textarea
              name="shipping_address"
              placeholder={isArabic ? "العنوان" : "Address"}
              onChange={handleChange}
              className="border p-3 rounded-xl text-black bg-[#F3F3F5] w-full h-32"
            />{" "}
            {/* Notes */}{" "}
            <textarea
              name="shipping_notes"
              placeholder={isArabic ? "ملاحظات" : "Notes"}
              onChange={handleChange}
              className="border p-3 rounded-xl text-black bg-[#F3F3F5] w-full h-24"
            />{" "}
            {/* Payment Method */}{" "}
            <label className="text-black">
              {" "}
              {isArabic ? "طريقة الدفع" : "Payment Method"}{" "}
            </label>{" "}
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-3 w-full h-[60px] rounded-xl text-black bg-[#F3F3F5]"
            >
              {" "}
              <option value="">
                {" "}
                {isArabic ? "اختر طريقة الدفع" : "Select payment method"}{" "}
              </option>{" "}
              <option value="cod">
                {" "}
                {isArabic ? "الدفع عند الاستلام" : "Cash on delivery"}{" "}
              </option>{" "}
              <option value="instapay">Instapay</option>{" "}
              <option value="vodafone_cash">
                {" "}
                {isArabic ? "فودافون كاش" : "Vodafone Cash"}{" "}
              </option>{" "}
            </select>{" "}
            {/* يظهر بس لو مش COD */}{" "}
            {paymentMethod !== "cod" && paymentMethod !== "" && (
              <>
                {" "}
                <label className="flex gap-2 text-black">
                  {" "}
                  <FiPhoneCall />{" "}
                  {isArabic ? "رقم التحويل" : "Transfer Phone Number"}{" "}
                </label>{" "}
                <input
                  name="wallet_phone"
                  onChange={handleChange}
                  className="border p-3 w-full text-black h-[60px] rounded-xl bg-[#F3F3F5]"
                />{" "}
              </>
            )}{" "}
            
            {/* Upload يظهر بس لو مش COD */}{" "}
            {paymentMethod !== "cod" && paymentMethod !== "" && (
              <>
              <label className="flex gap-2 text-black">
              {" "}
              <FaCloudUploadAlt />{" "}
              {isArabic
                ? "إرفاق صورة تحويل المبلغ"
                : "Upload Payment Transfer Screenshot"}{" "}
            </label>{" "}
                {" "}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptImage(e.target.files[0])}
                  className="border p-3 w-full rounded-xl text-black bg-[#F3F3F5]"
                />{" "}
                {receiptImage && (
                  <img
                    src={URL.createObjectURL(receiptImage)}
                    alt="preview"
                    className="w-32 rounded-lg"
                  />
                )}{" "}
              </>
            )}{" "}
          </div>
          {/* الفورم زي ما هو بدون تغيير */}

          <button
            onClick={handleCheckout}
            className="bg-[#790000] hover:bg-[#850101] w-full py-4 rounded-2xl"
          >
            {isArabic ? "إتمام الدفع" : "Continue to pay"}
          </button>
        </div>
        {/* Summary */}{" "}
        <div className="bg-white text-black p-6 container mx-auto max-w-xl rounded-2xl shadow-lg h-fit sticky mt-20">
          {" "}
          <h3 className="text-2xl font-medium text-center text-black mb-4">
            {" "}
            {isArabic ? "ملخص الطلب" : "Order Summary"}{" "}
          </h3>{" "}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {" "}
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder={isArabic ? "كود الخصم" : "Coupon code"}
              className="flex-1 border rounded-lg px-4 py-2 text-black"
            />{" "}
            <button
              onClick={applyCoupon}
              className="bg-red-800 text-white px-6 py-2 rounded-lg"
            >
              {" "}
              {isArabic ? "تطبيق" : "Apply"}{" "}
            </button>{" "}
          </div>{" "}
          <div className="flex justify-between text-lg mb-2">
            {" "}
            <span>{isArabic ? "المجموع" : "Subtotal"}</span>{" "}
            <span>{subtotal} EG</span>{" "}
          </div>{" "}
          {discount > 0 && (
            <div className="flex justify-between text-lg mb-2">
              {" "}
              <span>{isArabic ? "الخصم" : "Discount"}</span>{" "}
              <span className="text-red-700">{discount} EG</span>{" "}
            </div>
          )}{" "}
          <div className="flex justify-between text-lg mb-2 border-b-2 pb-2">
            {" "}
            <span>{isArabic ? "التوصيل" : "Delivery"}</span>{" "}
            <span>{Delivery} EG</span>{" "}
          </div>{" "}
          <div className="flex justify-between text-xl font-medium mt-3">
            {" "}
            <span>{isArabic ? "الإجمالي" : "Total"}</span>{" "}
            <span>{total + Delivery} EG</span>{" "}
          </div>{" "}
          <h1 className="mt-6 text-black">
            {" "}
            {isArabic
              ? "ملحوظة: التوصيل متاح داخل القاهرة فقط"
              : "Note: Delivery available in Cairo only"}{" "}
          </h1>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
