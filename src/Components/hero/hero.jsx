import React, { useEffect, useState } from "react";
import video from "../../../public/hero.mp4";
import Navbar from "../Navbar/Navbar";
import { useLanguage } from "../../Context/LanguageContext";
import Navbar2 from "../Navbar2/Navbar2";

export default function Hero2() {
  const { lang } = useLanguage();

  const textEn = "Welcome To Puff Stuff's World";
  const textAr = "مرحبًا بك في  عالم بف استف";

  const text = lang === "ar" ? textAr : textEn;

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (lang === "ar") {
        setDisplayedText(text.slice(text.length - i - 1));
      } else {
        setDisplayedText(text.slice(0, i + 1));
      }

      i++;

      if (i === text.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [lang, text]);

  return (
    <div className="relative h-screen w-full  overflow-hidden">
      <Navbar2 />

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/preview.jpg"
      />

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <h1
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="text-2xl md:text-[90px] anton-regular permanent-marker-regular bungee-regular dm-serif-display-regular  dm-serif-display-regular-italic font-bold text-[#ffffff]"
        >
          {displayedText}
        </h1>
      </div>
    </div>
  );
}