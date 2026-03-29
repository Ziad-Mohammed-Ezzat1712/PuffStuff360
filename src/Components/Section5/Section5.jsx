// //Devices section
// import React, { useState } from "react";
// import { useCart } from "../../Context/CartContext1.jsx";
// import Device1 from "../../assets/Images/device1.png";
// import Device2 from "../../assets/Images/device2.png";
// import { Heart } from "lucide-react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// export default function Section2() {
//  const { addToCart } = useCart();
//   const [loadingId, setLoadingId] = useState(null);

//   const products = [
//     {
//       id: 1,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device1,
//     },
//     {
//       id: 2,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device2,
//     },
//     {
//       id: 3,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device1,
//     },
//     {
//       id: 4,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device2,
//     },
//         {
//       id: 5,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device1,
//     },
//     {
//       id: 6,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device2,
//     },
//     {
//       id: 7,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device1,
//     },
//     {
//       id: 8,
//       name: "Splash",
//       desc: "Blue ice - Black currant & Grapes",
//       price: "200 EG",
//       rating: 4.6,
//       image: Device2,
//     },
  
   
//   ];

//   const handleAddToCart = (product) => {
//     setLoadingId(product.id);
//     setTimeout(() => {
//       addToCart(product);
//       setLoadingId(null);
//       toast.success(`${product.name} added to cart! 🛒`);
//     }, 800); // محاكاة تحميل بسيط
//   };

//   return (
//     <section className="px-4 py-10">
//       <h2 className="text-white text-left text-3xl font-bold mb-8">Devices</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((product, index) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group relative hover:scale-105 md:hover:scale-110"
//           >
//             {/* Image */}
//           <Link to={`/product/${product.id}`}>
//               <div className="flex justify-center items-center h-72 bg-gray-100">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-52 object-contain transition-transform duration-500 ease-in-out hover:animate-tilt"
//                 />
//               </div>
//             </Link>

//             {/* Content */}
//             <div className="p-4 rounded-t-2xl space-y-5">
//               <h3 className="text-lg text-left font-semibold text-black mb-1">
//                 {product.name}
//               </h3>
//               <p className="text-gray-500 text-left text-sm mb-3">
//                 {product.desc}
//               </p>

//               {/* Price & Rating */}
//               <div className="flex items-center justify-between mb-3">
//                 <span className="font-bold text-black text-base">
//                   {product.price}
//                 </span>
//                 <div className="flex items-center space-x-1 text-yellow-400 text-sm">
//                   <span>★</span>
//                   <span>★</span>
//                   <span>★</span>
//                   <span>★</span>
//                   <span className="text-gray-300">★</span>
//                   <span className="text-gray-600 text-xs ml-1">
//                     {product.rating}
//                   </span>
//                 </div>
//               </div>

//               {/* Buttons */}
//            <div className="flex items-center justify-between gap-2">
//                 <button className="w-[50%] border border-[#A59F9F] hover:bg-[#4E0000] text-[#A59F9F] hover:text-white py-2 rounded-lg transition">
//                   Buy Now
//                 </button>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={loadingId === product.id}
//                   className={`w-[50%] py-2 rounded-lg transition text-white ${
//                     loadingId === product.id
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000]"
//                   }`}
//                 >
//                   {loadingId === product.id ? "Adding..." : "Add to Cart"}
//                 </button>

                
//                 <button className="w-10 h-10 border border-[#A59F9F] rounded-lg flex items-center justify-center bg-transparent transition">
//                   <Heart size={20} className="text-[#A59F9F]" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useCart } from "../../Context/CartContext1.jsx";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Heart } from "lucide-react";
// import { useLanguage } from "../../Context/LanguageContext";

// export default function Section4() {
//   const { addToCart } = useCart();
//   const { isArabic } = useLanguage();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null);

//   // ================= FETCH PRODUCTS (DEVICES ONLY) =================
//   useEffect(() => {
//     axios
//       .get(
//         `https://dashboard.splash-e-liquid.com/products/getallproducts.php?nocache=${Date.now()}`
//       )
//       .then((res) => {
//         if (res.data.status) {
//           const formatted = res.data.data
//             .filter((item) => item.category_key === "device")
//             .map((item) => ({
//               id: item.product_id,
//               name: isArabic ? item.name_ar : item.name_en,
//               desc: isArabic
//                 ? item.description_ar?.slice(0, 80)
//                 : item.description_en?.slice(0, 80),
//               price: item.price,
//               rating: 4.6,
//               image: item.image,
//               category: item.category_key,
//               stock: item.stock,
//             }));

//           setProducts(formatted);
//         }
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [isArabic]);

//   // ================= ADD TO CART =================
//   const handleAddToCart = (product) => {
//     setLoadingId(product.id);
//     setTimeout(() => {
//       addToCart(product);
//       setLoadingId(null);
//       toast.success(
//         isArabic
//           ? `تمت إضافة ${product.name} إلى السلة 🛒`
//           : `${product.name} added to cart 🛒`
//       );
//     }, 800);
//   };

//   return (
//     <>
//      <div className=" flex justify-between">
//        {/* Title */}
//       <h2 className="text-[42px] mb-8  text-white text-left font-bold">
//         {isArabic ? "منتجات الأجهزة" : "Our Devices Products"}
//       </h2>

//       {/* Sort */}
//       <div className="flex justify-end items-center gap-3 mb-6">
//         <h1 className="text-gray-300 font-medium">
//           {isArabic ? "ترتيب حسب" : "Sort by"}
//         </h1>

//         <select className="bg-white text-gray-700 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#4E0000]">
//           <option>{isArabic ? "اختر" : "Select"}</option>
//           <option>{isArabic ? "الأكثر مبيعًا" : "Best Seller"}</option>
//           <option>
//             {isArabic ? "السعر: من الأقل للأعلى" : "Price: Low to High"}
//           </option>
//           <option>
//             {isArabic ? "السعر: من الأعلى للأقل" : "Price: High to Low"}
//           </option>
//           <option>{isArabic ? "الأحدث" : "Newest"}</option>
//         </select>
//       </div>
//      </div>

//       {/* ================= PRODUCTS ================= */}
//       <div className="grid md:grid-cols-4 gap-8">
//         {loading && (
//           <p className="text-white text-xl col-span-3 text-center">
//             {isArabic ? "جاري تحميل المنتجات..." : "Loading products..."}
//           </p>
//         )}

//         {!loading &&
//           products.slice(0, 8).map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden
//                          hover:shadow-2xl transition-all duration-500
//                          hover:scale-105 flex flex-col"
//             >
//               {/* Image */}
//               <Link to={`/product/${product.id}`}>
//                 <div className="flex justify-center items-center h-64 bg-gray-100">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-48 object-contain transition-transform duration-500 ease-in-out hover:animate-tilt"
//                   />
//                 </div>
//               </Link>

//               {/* Content */}
//               <div className="p-4 flex flex-col flex-1 text-left gap-3">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>

//                 <p className="text-gray-500 text-sm line-clamp-2">
//                   {product.desc}
//                 </p>

//                 <div className="flex justify-between items-center">
//                   <span className="font-bold">EGP {product.price}</span>

//                   <div className="text-yellow-400 text-sm">
//                     ★★★★☆
//                     <span className="text-gray-600 text-xs ml-1">
//                       {product.rating}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex items-center gap-2 mt-auto">
//                   <button className="w-[45%] border border-[#A59F9F] py-2 rounded-lg hover:bg-[#4E0000] hover:text-white transition">
//                     {isArabic ? "اشتري الآن" : "Buy Now"}
//                   </button>

//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     disabled={loadingId === product.id}
//                     className={`w-[45%] py-2 rounded-lg text-white transition ${
//                       loadingId === product.id
//                         ? "bg-gray-400"
//                         : "bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000]"
//                     }`}
//                   >
//                     {loadingId === product.id
//                       ? isArabic
//                         ? "جاري الإضافة..."
//                         : "Adding..."
//                       : isArabic
//                       ? "أضف للسلة"
//                       : "Add to Cart"}
//                   </button>

//                   <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
//                     <Heart size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";

export default function Section4() {
  const { addToCart } = useCart();
  const { isArabic } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    axios
      .get(`https://dashboard.splash-e-liquid.com/products/getallproducts.php?nocache=${Date.now()}`)
      .then((res) => {
        if (res.data.status) {

          const formatted = res.data.data
            .filter((item) => item.data?.category_en === "device")
            .map((item) => {

              const firstVariant = item.device?.[0];

              return {
                id: item.data?.product_id,
                name: isArabic
                  ? item.data?.product_name_ar
                  : item.data?.product_name_en,

                desc: isArabic
                  ? item.data?.description_ar?.slice(0, 80)
                  : item.data?.description_en?.slice(0, 80),

                price: firstVariant?.price || 0,
                rating: 4.6,

                image: item.data?.image,

                colorCount: item.device?.length || 0,

                variants: item.device || [],
              };
            });

          setProducts(formatted);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isArabic]);

  // ================= ADD TO CART =================
  const handleAddToCart = (product) => {
    setLoadingId(product.id);

    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);

      toast.success(
        isArabic
          ? `تمت إضافة ${product.name} إلى السلة 🛒`
          : `${product.name} added to cart 🛒`
      );
    }, 800);
  };

  return (
    <>
      <div className="flex justify-between">

        <h2 className="text-[42px] mb-8 text-white font-bold">
          {isArabic ? "منتجات السوائل" : "Our device Products"}
        </h2>

        <div className="flex items-center gap-3 mb-6">
           <h1 className="text-gray-300 font-bold text-[24px]">
                    <Link className="text-white hover:text-[#c40a0a]" to="/products">
                        {isArabic ? " اطلع علي جميع المنتجات" : "View All Products"}
        
                  </Link>
                 </h1>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">

        {loading && (
          <p className="text-white text-xl col-span-full text-center">
            {isArabic ? "جاري تحميل المنتجات..." : "Loading products..."}
          </p>
        )}

        {!loading &&
          products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden
              hover:shadow-2xl transition-all duration-500
              hover:scale-105 flex flex-col"
            >

              {/* IMAGE */}
              <Link to={`/product/${product.id}`}>
                <div className="flex justify-center items-center h-64 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 object-contain"
                  />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1 text-left gap-3">

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.desc}
                </p>

                <div className="flex justify-between items-center">

                  <span className="font-bold">
                    EGP {product.price}
                  </span>

                  <span className="text-xs text-gray-500">
                    {product.colorCount} Colors
                  </span>

                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-2 mt-auto">

                  <button className="w-[45%] border border-[#A59F9F] py-2 rounded-lg hover:bg-[#4E0000] hover:text-white transition">
                    {isArabic ? "اشتري الآن" : "Buy Now"}
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingId === product.id}
                    className={`w-[45%] py-2 rounded-lg text-white transition ${
                      loadingId === product.id
                        ? "bg-gray-400"
                        : "bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000]"
                    }`}
                  >
                    {loadingId === product.id
                      ? isArabic
                        ? "جاري الإضافة..."
                        : "Adding..."
                      : isArabic
                      ? "أضف للسلة"
                      : "Add to Cart"}
                  </button>

                  <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
                    <Heart size={20} />
                  </button>

                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}


