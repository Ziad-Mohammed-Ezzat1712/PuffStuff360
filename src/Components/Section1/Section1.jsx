// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import blue from "../../assets/Images/blueice.webp";
import watermelon from "../../assets/Images/watermallon.webp";
import mango from "../../assets/Images/mango.webp";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const bottles = [
  {
    id: 1,
    img: blue,
    color: "#A714FD", // اللون الأساسي اللي قولت عليه
    title: "Splash liquid",
    desc: "Crafted with precision for pure, rich flavor in every drop Our e-liquid blends science and passion to perfect your vape.",
     desc2: "Experience the ultimate splash of flavor with every puff. Vape Splash delivers bold taste and smooth clouds that hit just right. Designed for style, power, and pure satisfaction. Elevate your vibe — feel the splash, feel the difference.",
  },
  {
    id: 2,
    img: watermelon,
    color: "#FF007F", // مثال للون تاني
    title: "Rpzetta liquid",
    desc: "Crafted with precision for pure, rich flavor in every drop Our e-liquid blends science and passion to perfect your vape.",
     desc2: "Experience the ultimate splash of flavor with every puff. Vape Splash delivers bold taste and smooth clouds that hit just right. Designed for style, power, and pure satisfaction. Elevate your vibe — feel the splash, feel the difference.",},
  {
    id: 3,
    img: mango,
    color: "#FFA500", // لون ثالث (مانجو)
    title: "Rpzetta liquid",
    desc: "Crafted with precision for pure, rich flavor in every drop Our e-liquid blends science and passion to perfect your vape.",
     desc2: "Experience the ultimate splash of flavor with every puff. Vape Splash delivers bold taste and smooth clouds that hit just right. Designed for style, power, and pure satisfaction. Elevate your vibe — feel the splash, feel the difference.",},
];

export default function SplashSlider() {
const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bottles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % bottles.length);
  };

  const getPosition = (i) => {
    const diff = (i - index + bottles.length) % bottles.length;

    switch (diff) {
      case 0:
        return { scale: 1, x: 400, y: 0, zIndex: 30, opacity: 1 };
      case 1:
        return { scale: 0.2, x: 800, y: -260, zIndex: 20, opacity: 0.8 };
      case 2:
        return { scale: 0.2, x: 800, y: 260, zIndex: 10, opacity: 0.6 };
      default:
        return { scale: 0, opacity: 0 };
    }
  };


  return (
    <>
    <div
      className="relative flex justify-center items-start pt-6 h-[700px] w-full overflow-hidden transition-all rounded-xl mb-10 duration-700"
      style={{
        background: `radial-gradient(circle at center, white 0%, ${bottles[index].color} 60%)`,
      }}
    >
      {/* ===== النص على الشمال ===== */}
      <div className="absolute left-10 text-left max-w-md text-white space-y-5">
        <motion.h1
          key={bottles[index].id + "-title"}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[52px] font-normal drop-shadow-lg"
        >
          {bottles[index].title}
        </motion.h1>

        <motion.p
          key={bottles[index].id + "-desc"}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[32px] font-medium leading-relaxed drop-shadow-md"
        >
          {bottles[index].desc}
        </motion.p>
         <motion.p
          key={bottles[index].id + "-desc2"}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[16px] font-medium leading-relaxed drop-shadow-md"
        >
          {bottles[index].desc2}
        </motion.p>
      </div>

      {/* ===== صور الإزازات ===== */}
      {bottles.map((bottle, i) => {
        const pos = getPosition(i);

        const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
          <motion.img
            key={bottle.id}
            src={bottle.img}
            alt="bottle"
            className="w-48 md:w-56 cursor-pointer absolute drop-shadow-2xl"
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

     <div className="w-full px-2 md:px-0 flex justify-center my-24">
      <div className="flex items-center w-[800px] bg-white rounded-full shadow-sm border border-gray-300 px-4 py-2 transition">
        {/* 🔍 أيقونة البحث */}
        <FaSearch className="text-gray-400 mr-3 text-lg" />

        {/* 📝 حقل الإدخال */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
        />

        {/* ⚙️ أيقونة الفلترة */}
        <FaSlidersH className="text-gray-400 text-lg ml-3 hover:text-[#440707] transition cursor-pointer" />
      </div>
    </div>
    </>
  );
}

