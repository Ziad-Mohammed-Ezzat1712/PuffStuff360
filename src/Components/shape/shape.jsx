// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";

export default function Shape() {
  const { pathname } = useLocation();

  // الخطوات بالترتيب
  const steps = [
    { id: 1, name: "Your Cart", path: "/cart" },
    { id: 2, name: "Shipping data", path: "/shippingpage" },
    { id: 3, name: "Payment method", path: "/paymentpage" },
    { id: 4, name: "Details", path: "/details" },
    { id: 5, name: "Confirmation", path: "/confirmation" },
  ];

  // نجيب ترتيب الصفحة الحالية
  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  return (
    <div className="flex justify-center items-center gap-10 px-10 py-10">
      {steps.map((step, index) => {
        // الشرط: لو الخطوة الحالية أو أي خطوة قبلها → فعالة
        const isActive = index <= currentStepIndex;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <h1
                className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#790000] text-white"
                    : "bg-[#E5E7EB] text-[#999999]"
                }`}
              >
                {step.id}
              </h1>
              <p className="mt-2 text-white font-medium">{step.name}</p>
            </div>

            {/* السهم بين الخطوات */}
            {index < steps.length - 1 && (
              <i className="fa-solid fa-arrow-right text-6xl text-[#E5E7EB] mx-2"></i>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
