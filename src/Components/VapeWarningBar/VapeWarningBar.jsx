import React, { useEffect, useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function VapeWarningBar() {
  const [visible, setVisible] = useState(false);

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
    <div className="fixed  top-0 left-0 w-full z-50 bg-[#1d0606] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Left Content */}
        <div className="flex items-center gap-2 text-sm md:text-base">
          <AlertTriangle size={18} className="text-[#00AEEF]" />
          <p>
            This website is intended for adults (18+) only. Vape products contain nicotine and are addictive.
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