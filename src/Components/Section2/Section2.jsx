import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";

export default function Section2() {
  const { addToCart } = useCart();
  const { isArabic } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    axios
      .get(`//products/getallproducts.php?nocache=${Date.now()}`)
      .then((res) => {
        if (res.data.status) {

          const formatted = res.data.data
            .filter((item) => item.data?.category_en === "liquid")
            .map((item) => {

              const firstVariant = item.liquid?.[0];

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

                flavorCount: item.liquid?.length || 0,

                variants: item.liquid || [],
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
          {isArabic ? "منتجات السوائل" : "Our Liquid Products"}
        </h2>

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-gray-300 font-medium">
            {isArabic ? "ترتيب حسب" : "Sort by"}
          </h1>

          <select className="bg-white text-gray-700 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#4E0000]">
            <option>{isArabic ? "اختر" : "Select"}</option>
            <option>{isArabic ? "الأكثر مبيعًا" : "Best Seller"}</option>
            <option>{isArabic ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
            <option>{isArabic ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
            <option>{isArabic ? "الأحدث" : "Newest"}</option>
          </select>
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
                    {product.flavorCount} Flavors
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