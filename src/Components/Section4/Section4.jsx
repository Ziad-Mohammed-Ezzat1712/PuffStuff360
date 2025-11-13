

// import React, { useState, useEffect } from 'react';

// // استيراد الصورتين (تأكد من تحديث المسارات لتناسب مشروعك)
// import img1 from '../../assets/Images/img1.png'; // الصورة العادية (العلوية)
// import img2 from '../../assets/Images/img2.png'; 

// export default function Section4() {
//   const [isGlitched, setIsGlitched] = useState(false);
//   const [isCardOpen, setIsCardOpen] = useState(false);

//   useEffect(() => {
//     // تبديل حالة التشويش كل 1000 مللي ثانية (1 ثانية)
//     const intervalId = setInterval(() => {
//       setIsGlitched(prevIsGlitched => !prevIsGlitched);
//     }, 2000); 

//     const handleAddToCart = (product) => {
  //   setLoadingId(product.id);
  //   setTimeout(() => {
  //     addToCart(product);
  //     setLoadingId(null);
  //     toast.success(`${product.name} added to cart! 🛒`);
  //   }, 800); // محاكاة تحميل بسيط
  // };

  // return () => clearInterval(intervalId);
//   }, []); 

//   const handleOfferClick = () => {
//     setIsCardOpen(prevIsCardOpen => !prevIsCardOpen);
//     console.log(`Card is now ${!isCardOpen ? 'Open' : 'Closed'}`);
//   };

//   const handleAddToCart = (product) => {
  //   setLoadingId(product.id);
  //   setTimeout(() => {
  //     addToCart(product);
  //     setLoadingId(null);
  //     toast.success(`${product.name} added to cart! 🛒`);
  //   }, 800); // محاكاة تحميل بسيط
  // };

  // return (
//     <div className="relative w-full overflow-hidden shadow-2xl">
      
//       {/* الصورة والمحتوى */}
//       <div className="relative flex items-center justify-start h-[450px]">
        
//         {/* الصورة الأساسية أو المشوشة بناءً على حالة isGlitched */}
//         <img 
//           src={isGlitched ? img2 : img1} // هنا يتم التبديل بين الصورتين
//           alt="Best Offers on Best Devices" 
//           // عند التبديل بين الصورتين، يمكننا تطبيق تأثير انتقال سلس إذا أردت
//           className="w-full h-full object-fill opacity-80 transition-opacity duration-600 ease-in-out"
//         />
        

        
//         {/* زر العرض (GET OFFER) */}
//         <button 
//           className="absolute top-0 right-0 h-full w-8 bg-red-600 text-white font-bold text-xs transform rotate-180 z-20 hover:bg-red-700 transition-colors"
//           style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
//           onClick={handleOfferClick}
//         >
//           <span className="text-white transform rotate-180">GET OFFER 20%</span>
//           <span className="text-white transform rotate-180 text-lg">▲</span>
//         </button>
//       </div>

//       {/* الكارد الذي سيظهر عند الضغط */}
//       {isCardOpen && (
//         <div className="absolute top-0 right-8 mt-2 p-4 bg-gray-800 text-white shadow-xl z-30 w-64 rounded-lg animate-fade-in">
//           {/* هنا محتوى الكارد الذي سترسله لاحقاً */}
//           <h3 className="font-bold text-lg">🎉 العروض الخاصة!</h3>
//           <p className="text-sm mt-1">
//             هذا هو الكارد الذي سيظهر عند الضغط على زر العرض.
//           </p>
//         </div>
//       )}
      
//       {/* هذا الـ <style> ضروري لإضافة الـ Keyframes والـ Utilities المخصصة لتأثير النيون وظهور الكارد */}
//       <style jsx>{`
//         /* تأثيرات النيون */
//         .neon-cyan {
//           text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
//           color: cyan;
//         }
//         .neon-magenta {
//           text-shadow: 0 0 5px #f0f, 0 0 10px #f0f, 0 0 20px #f0f;
//           color: magenta;
//         }
        
//         /* أنميشن لظهور الكارد */
//         @keyframes fade-in {
//             from { opacity: 0; transform: translateY(-10px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//             animation: fade-in 0.5s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';

// استيراد الصورتين (تأكد من تحديث المسارات لتناسب مشروعك)
import img11 from '../../assets/Images/img1.png'; // الصورة العادية (العلوية)
import img22 from '../../assets/Images/img2.png'; 
import img2 from '../../assets/Images/img2.webp'; 
import img1 from '../../assets/Images/img1.webp'; 


export default function Section4() {
  const [isGlitched, setIsGlitched] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    // التبديل بين الحالتين كل ثانيتين (2000 مللي ثانية)
    const intervalId = setInterval(() => {
      // نترك isGlitched تعمل كـ Toggle لتحديد حالة التلاشي
      setIsGlitched(prevIsGlitched => !prevIsGlitched);
    }, 2000); 

    const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return () => clearInterval(intervalId);
  }, []); 

  const handleOfferClick = () => {
    setIsCardOpen(prevIsCardOpen => !prevIsCardOpen);
     setIsOpen((prev) => !prev);
  };
  // دالة وهمية للتعامل مع التسجيل
  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered successfully!");
    // يمكنك إضافة منطق التسجيل الفعلي هنا
  };

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div className="relative w-full bg-black overflow-hidden shadow-2xl rounded-xl">
      
      {/* الصورة والمحتوى */}
      <div className="relative h-[480px] rounded-xl ">
        
        {/* 1. الصورة العادية (تكون في الأسفل) */}
        <img 
          src={img1} 
          alt="Best Offers on Best Devices" 
          className="absolute inset-0 w-full h-full object-fill opacity-80 "
        />
        
        {/* 2. الصورة المشوشة (تكون في الأعلى) */}
        <img 
          src={img2} 
          alt="Best Offers on Glitched" 
          className={`
            absolute inset-0 w-full h-full object-fill 
            transition-opacity duration-500 ease-in-out // المدة التي تستغرقها عملية التلاشي
            ${isGlitched ? 'opacity-100' : 'opacity-0'} // تتحكم في شفافية الصورة المشوشة
          `}
        />

   
        
        {/* زر العرض (GET OFFER) */}
     <button
      className="absolute top-0 right-0 h-full w-12 bg-[#FF0000] rounded-xl text-white font-bold text-[32px] transform rotate-180 z-20 hover:bg-red-700 transition-colors"
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      onClick={handleOfferClick}
    >
      <span className="text-white transform rotate-180">GET OFFER 20%</span>

      {/* السهم */}
      <span
        className={`text-white transform rotate-180 text-[32px] inline-block transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        ▲
      </span>
    </button>
      </div>

      {/* الكارد الذي سيظهر عند الضغط */}
    {isCardOpen && (
        <div 
          className="absolute top-0 right-12 w-86  bg-white text-black shadow-2xl z-30 p-6  animate-fade-in"
          // يمكنك إضافة بعض التعديلات ليتناسب مع ارتفاع البانر
          style={{ height: '100%' }} 
        >
          <form onSubmit={handleRegister}>
            <div className="mb-4 text-center">
              <p className="text-[20px] font-medium mb-2">
                REGISTERD AND GET
              </p>
              <div className="flex justify-center items-center mb-2 gap-6">
           <div>
                 <span className="text-[52px] font-bold text-black mr-2">
                  20%
                </span>
                <h1 className='text-[20px]'>off</h1>
           </div>
                <div className="flex flex-col text-left text-[20px] font-medium">
                  <span>OFF</span>
                  <span className="text-black">Free Shipping</span>
                  <span className="text-black">Free Shipping</span>
                </div>
              </div>
         
            </div>

            {/* حقل البريد الإلكتروني */}
            <input 
              type="email"
              placeholder="ENTER YOUR EMAIL ADDRES"
              required
              className="w-full p-2 border border-black rounded-2xl text-sm focus:outline-none focus:border-red-600"
            />

            {/* زر التسجيل الأحمر */}
            <button 
              type="submit"
              className="w-full mt-4 p-2 bg-[#FF0000] rounded-2xl text-white font-bold text-base uppercase hover:bg-red-700 transition-colors"
            >
              REGISTER
            </button>
          </form>
        </div>
      )}
      {/* الـ CSS المخصص */}
      <style jsx>{`
        .neon-cyan {
          text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
          color: cyan;
        }
        .neon-magenta {
          text-shadow: 0 0 5px #f0f, 0 0 10px #f0f, 0 0 20px #f0f;
          color: magenta;
        }
        
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}