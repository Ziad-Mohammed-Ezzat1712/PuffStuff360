// WishList.jsx
import React, { useState, useEffect } from "react";
import { useWishlist } from "../../Context/WishlistContext.jsx"; // عدل حسب مكان الكونتكست
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function WishList() {
  const { wishlistItems, wishlistCount, removeFromWishlist, fetchWishlist } =
    useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      await fetchWishlist();
      setLoading(false);
    };
    loadWishlist();
  }, []);

  return (
    <>
      <h2 className="text-[50px] mb-24 text-white text-center">
        My Wishlist ({wishlistCount})
      </h2>

      <div className="grid md:grid-cols-[20%_80%] gap-8">
        {/* ================= FILTERS ================= */}
        <div className="bg-white p-6 hidden md:block rounded-2xl shadow-lg h-fit sticky top-20">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>
          <hr className="mb-4" />

          {/* Categories */}
          <div className="space-y-3 text-gray-700">
            {[
              "LIQUID",
              "PODS",
              "TANK",
              "DISPOSABLE",
              "COILS & CARTRIDGE",
              "MOD",
              "FULL KITS",
              "ACCESSORIES",
            ].map((item) => (
              <div key={item} className="flex justify-between cursor-pointer">
                <span>{item}</span>
                <span>{">"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= WISHLIST PRODUCTS ================= */}
        <div className="grid md:grid-cols-3 gap-8">
          {loading && (
            <p className="text-white text-xl col-span-3 text-center">
              Loading wishlist...
            </p>
          )}

          {!loading && wishlistItems.length === 0 && (
            <p className="text-white text-xl col-span-3 text-center">
              Your wishlist is empty
            </p>
          )}

          {!loading &&
            wishlistItems.map((item) => {
              const product = item.product;
              return (
                <div
                  key={item.wishlist_id}
                  className="bg-white rounded-xl shadow-md overflow-hidden
                           hover:shadow-2xl transition-all duration-500
                           hover:scale-105 flex flex-col"
                >
                  {/* Image */}
                  <Link to={`/product/${product.product_id}`}>
                    <div className="flex justify-center items-center h-64 bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name_en}
                        className="h-52 object-contain transition-transform duration-500 ease-in-out hover:animate-tilt"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 text-left gap-3">
                    <h3 className="text-lg font-semibold">{product.name_en}</h3>

                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.description_en}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="font-bold">EGP {product.price}</span>

                      <div className="text-yellow-400 text-sm">
                        ★★★★☆
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => removeFromWishlist(item.wishlist_id)}
                        className="w-full py-2 rounded-lg text-white bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000] transition"
                      >
                        Remove
                      </button>

                      <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
                        <Heart size={20} className="text-[#4E0000]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
