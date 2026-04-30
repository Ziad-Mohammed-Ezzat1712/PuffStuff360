// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";

export default function Shape() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const steps = [
    {
      id: 1,
      nameAr: "سلة المشتريات",
      nameEn: "Your Cart",
      path: "/cart",
    },
    {
      id: 2,
      nameAr: "طريقة الدفع",
      nameEn: "Payment method",
      path: "/paymentpage",
    },
    {
      id: 3,
      nameAr: "بيانات الشحن",
      nameEn: "Shipping data",
      path: "/shippingpage",
    },
    {
      id: 4,
      nameAr: "تأكيد الطلب",
      nameEn: "Confirmation",
      path: "/confirmation",
    },
  ];

  const currentStepIndex = steps.findIndex(
    (step) => step.path === pathname
  );

  return (
    <div
      className={`md:flex hidden justify-center items-center gap-10 px-10 py-10 ${
        isArabic ? "flex-row-reverse" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {steps.map((step, index) => {
        const isActive = index <= currentStepIndex;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <h1
                className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#790000] text-white"
                    : "bg-[#E5E7EB] text-[#999999]"
                }`}
              >
                {step.id}
              </h1>

              <p className="mt-2 text-white font-medium">
                {isArabic ? step.nameAr : step.nameEn}
              </p>
            </div>

            {/* السهم */}
            {index < steps.length - 1 && (
              <i
                className={`fa-solid fa-arrow-${
                  isArabic ? "right" : "right"
                } text-6xl text-[#E5E7EB] mx-2`}
              ></i>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}