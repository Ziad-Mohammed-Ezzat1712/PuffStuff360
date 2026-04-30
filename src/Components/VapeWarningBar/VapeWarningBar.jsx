import React, { useEffect, useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext"; // عدل المسار حسب مشروعك

export default function VapeWarningBar() {
  const [visible, setVisible] = useState(false);
  const { isArabic } = useLanguage();

  useEffect(() => {
    const hidden = localStorage.getItem("vape_warning_hidden");
    if (!hidden) {
      setVisible(true);
    }
  }, []);

  const closeBar = () => {
    setVisible(false);
    localStorage.setItem("vape_warning_hidden", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#1d0606] text-white">
      <div
        className={`max-w-7xl mx-auto px-4 md:px-56 py-3 flex items-center justify-between gap-3 ${
          isArabic ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}
      >
        {/* Content */}
        <div className="flex items-center gap-2 text-sm md:text-base">
          <AlertTriangle size={18} className="text-[#ffef0b]" />
          <p>
            {isArabic
              ? "هذا الموقع مخصص للبالغين فقط (18+). منتجات الفيب تحتوي على النيكوتين وهي مسببة للإدمان."
              : "This website is intended for adults (18+) only. Vape products contain nicotine and are addictive."}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={closeBar}
          className="p-1 hover:bg-white/10 rounded transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}