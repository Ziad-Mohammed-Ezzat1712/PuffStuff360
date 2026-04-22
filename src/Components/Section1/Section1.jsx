import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../Context/LanguageContext";

import blue from "../../assets/Images/blueice.webp";
import watermelon from "../../assets/Images/watermallon.webp";
import mango from "../../assets/Images/mango.webp";

const bottles = [
  {
    id: 1,
    img: blue,
    color: "#A714FD",
    title: {
      en: "Splash liquid",
      ar: "سائل سبلاش",
    },
    desc: {
      en: "Crafted with precision for pure, rich flavor in every drop",
      ar: "مصنوع بدقة ليمنحك نكهة غنية ونقية في كل قطرة",
    },
    desc2: {
      en: "Experience the ultimate splash of flavor with every puff.",
      ar: "استمتع بأقوى نكهة مع كل نفس",
    },
  },
  {
    id: 2,
    img: watermelon,
    color: "#FF007F",
    title: {
      en: "Rozetta liquid",
      ar: "سائل روزيتا",
    },
    desc: {
      en: "Crafted with precision for pure, rich flavor in every drop",
      ar: "مصنوع بدقة ليمنحك نكهة غنية ونقية في كل قطرة",
    },
    desc2: {
      en: "Experience the ultimate splash of flavor with every puff.",
      ar: "استمتع بأقوى نكهة مع كل نفس",
    },
  },
  {
    id: 3,
    img: mango,
    color: "#FFA500",
    title: {
      en: "Mango liquid",
      ar: "سائل مانجو",
    },
    desc: {
      en: "Crafted with precision for pure, rich flavor in every drop",
      ar: "مصنوع بدقة ليمنحك نكهة غنية ونقية في كل قطرة",
    },
    desc2: {
      en: "Experience the ultimate splash of flavor with every puff.",
      ar: "استمتع بأقوى نكهة مع كل نفس",
    },
  },
];

export default function SplashSlider() {
  const [index, setIndex] = useState(0);
  const { lang, isArabic } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bottles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % bottles.length);
  };

  // 📱 Responsive + RTL positions
  const getPosition = (i) => {
    const diff = (i - index + bottles.length) % bottles.length;
    const isMobile = window.innerWidth < 768;

    // 🔥 عكس الاتجاه لو عربي
    const dir = isArabic ? -1 : 1;

    switch (diff) {
      case 0:
        return {
          scale: isMobile ? 0.8 : 1,
          x: isMobile ? 0 : 400 * dir,
          y: 0,
          zIndex: 30,
          opacity: 1,
        };
      case 1:
        return {
          scale: isMobile ? 0.4 : 0.2,
          x: isMobile ? 120 * dir : 800 * dir,
          y: isMobile ? -120 : -260,
          zIndex: 20,
          opacity: 0.8,
        };
      case 2:
        return {
          scale: isMobile ? 0.4 : 0.2,
          x: isMobile ? 120 * dir : 800 * dir,
          y: isMobile ? 120 : 260,
          zIndex: 10,
          opacity: 0.6,
        };
      default:
        return { scale: 0, opacity: 0 };
    }
  };

  return (
    <div
      className="relative flex justify-center items-start pt-6 h-[500px] md:h-[700px] w-full overflow-hidden transition-all rounded-xl mb-10 duration-700"
      style={{
        background: `radial-gradient(circle at center, white 0%, ${bottles[index].color} 60%)`,
      }}
    >
      {/* ===== النص ===== */}
      <div
        className={`absolute ${
          isArabic ? "right-5 text-right" : "left-5 text-left"
        } md:left-10 md:text-left  bottom-0 md:top-6 max-w-[90%] md:max-w-md text-white space-y-3 md:space-y-5`}
      >
        <motion.h1
          key={bottles[index].id + "-title"}
          initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[28px] md:text-[52px] font-normal"
        >
          {bottles[index].title[lang]}
        </motion.h1>

        <motion.p
          key={bottles[index].id + "-desc"}
          initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[0px]  md:text-[32px]"
        >
          {bottles[index].desc[lang]}
        </motion.p>

        <motion.p
          key={bottles[index].id + "-desc2"}
          initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[0px] md:text-[16px]"
        >
          {bottles[index].desc2[lang]}
        </motion.p>
      </div>

      {/* ===== الصور ===== */}
      {bottles.map((bottle, i) => {
        const pos = getPosition(i);

        return (
          <motion.img
            key={bottle.id}
            src={bottle.img}
            alt="bottle"
            className="w-32 md:w-56 absolute drop-shadow-2xl cursor-pointer"
            animate={pos}
            onClick={handleNext}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
            }}
          />
        );
      })}
    </div>
  );
} 