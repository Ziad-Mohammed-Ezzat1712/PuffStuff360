import React, { useEffect } from "react";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function WishList() {
  const { wishlist, fetchWishlist, removeFromWishlist, loading } =
    useWishlist();

  const { addToCart } = useCart();
  const { isArabic } = useLanguage();

  useEffect(() => {
    fetchWishlist();
  }, []);

  // // ================= ADD TO CART =================
  // const handleAddToCart = (item) => {
  //   addToCart({
  //     product: {
  //       product_id: item.product_id,
  //       name_en: item.name_en,
  //       image: item.image,
  //     },
  //     variant: {
  //       variant_id: item.variant_id,
  //       price: item.price,
  //     },
  //     quantity: 1,
  //   });

  //   toast.success(
  //     isArabic
  //       ? "تمت إضافة المنتج إلى السلة 🛒"
  //       : "Product added to cart 🛒"
  //   );
  // };

  return (
    <div className="px-6 py-10">
      {/* TITLE */}
      <h2 className="text-[42px] mb-8 text-white font-bold">
        {isArabic ? "المفضلة ❤️" : "My Wishlist ❤️"}
      </h2>

      {/* GRID */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
        {loading && (
          <p className="text-white text-xl col-span-full text-center">
            {isArabic ? "جاري تحميل..." : "Loading..."}
          </p>
        )}

        {!loading && wishlist.length === 0 && (
          <p className="text-white text-xl col-span-full text-center">
            {isArabic ? "لا يوجد منتجات في المفضلة" : "Wishlist is empty"}
          </p>
        )}

        {!loading &&
          wishlist.map((item) => (
            <div
              key={item.wishlist_id}
              className="bg-white rounded-xl shadow-md overflow-hidden
              hover:shadow-2xl transition-all duration-500
              hover:scale-105 flex flex-col"
            >
              {/* IMAGE */}
              <Link to={`/product/${item.product_id}`}>
                <div className="flex justify-center items-center h-64 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name_en}
                    className="h-48 object-contain"
                  />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1 text-left gap-3">
                {/* NAME */}
                <h3 className="text-lg font-semibold">
                  {isArabic ? item.name_ar : item.name_en}
                </h3>

                {/* FLAVOR */}
                <p className="text-gray-500 text-sm">
                  {isArabic
                    ? item.variant_details?.flavor_ar
                    : item.variant_details?.flavor_en}
                </p>

                {/* PRICE + STOCK */}
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    EGP {item.price}
                  </span>

                  <span className="text-xs text-gray-500">
                    {item.stock} {isArabic ? "متاح" : "In Stock"}
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-2 mt-auto">
                  {/* VIEW */}
                  <Link
                    className="w-full text-center py-2 rounded-lg text-white transition bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000]"
                    to={`/product/${item.product_id}`}
                  >
                    {isArabic ? "تفاصيل المنتج" : "View Details"}
                  </Link>

                  {/* DELETE ❤️ */}
                  <button
                    onClick={() =>
                      removeFromWishlist(item.wishlist_id)
                    }
                    className="p-2 rounded-lg border border-[#4E0000] text-[#4E0000] hover:bg-[#4E0000] hover:text-white transition"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}