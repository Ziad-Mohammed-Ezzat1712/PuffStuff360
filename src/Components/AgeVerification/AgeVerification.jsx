import { useEffect, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
export default function AgeVerification() {
  const [show, setShow] = useState(false);
  const { isArabic } = useLanguage();

  useEffect(() => {
    const isVerified = localStorage.getItem("ageVerified");
    if (!isVerified) {
      setShow(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    setShow(false);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com"; // أو صفحة تحذير
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-[90%] max-w-md text-center shadow-2xl animate-fadeIn">

        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00AEEF]/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#003366]/30 blur-3xl rounded-full"></div>

        {/* Logo */}
        <img
          src="/logo.png"
          alt="logo"
          className="w-24 mx-auto mb-4 drop-shadow-xl"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {isArabic ? "مرحبًا بك في متجرنا" : "Welcome to Our Store"}
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {isArabic
            ? "هذا الموقع يحتوي على منتجات مخصصة للبالغين فقط. يجب أن يكون عمرك 21 عامًا أو أكثر للدخول."
            : "This website contains products intended for adults only. You must be at least 21 years old to enter."}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleYes}
            className="bg-[#4E0000] text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            {isArabic ? "نعم، 21+" : "I'm 21+"}
          </button>

          <button
            onClick={handleNo}
            className="bg-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/30 transition duration-300"
          >
            {isArabic ? "أقل من 21" : "Under 21"}
          </button>
        </div>
      </div>
    </div>
  );
}