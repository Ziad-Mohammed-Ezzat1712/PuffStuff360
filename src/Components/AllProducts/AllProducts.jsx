import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";

export default function AllProducts() {
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
        console.log("API RESPONSE:", res.data);

        if (res.data.status && Array.isArray(res.data.data)) {
          const formatted = res.data.data.map((item) => {
            
            const product = item.data || {};
 const variant =
              item.device?.[0] ||
              item.disposable?.[0] ||
              item.liquid?.[0] ||
              item.salt?.[0] ||
              item.accessories?.[0] ||
              {};
//  isDevice = item.data?.category_en === "device";
//  isLiquid = item.data?.category_en === "liquid";
           
            return {
              id: product.product_id || Math.random(),
              name: product.product_name_en || "No Name",
              desc: product.description_en
                ? product.description_en.replace(/"/g, "").slice(0, 80)
                : "",
              price: variant.price || 0,
              rating: 4.6,
              image: product.image || "",
              category: product.category_en || "",
              stock: variant.stock || 0,
              flavorCount:
                item.liquid?.length ||
                item.salt?.length ||
                item.disposable?.length ||
                0,
              colorCount: item.device?.length || 0,
            };
          });

          console.log("FORMATTED PRODUCTS:", formatted);

          setProducts(formatted);
        }
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= ADD TO CART =================
  const handleAddToCart = (product) => {
    setLoadingId(product.id);

    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);

      toast.success(`${product.name} added to cart 🛒`);
    }, 800);
  };

  return (
    <>
      <h2 className="text-[50px] mb-24 text-white text-center">Our Products</h2>

      {/* Sort */}
      <div className="flex justify-end items-center gap-3 mb-6">
        <h1 className="text-gray-300 font-medium">Sort by</h1>

        <select className="bg-white text-gray-700 px-4 py-2 rounded-lg border">
          <option>Select</option>
          <option>Best Seller</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

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

        {/* ================= PRODUCTS ================= */}
        <div className="grid md:grid-cols-3 gap-8">
          {loading && (
            <p className="text-white text-xl col-span-3 text-center">
              Loading products...
            </p>
          )}

          {!loading && products.length === 0 && (
            <p className="text-white text-xl col-span-3 text-center">
              No products found
            </p>
          )}

          {!loading &&
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden
                hover:shadow-2xl transition-all duration-500
                hover:scale-105 flex flex-col"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="flex justify-center items-center h-64 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-52 object-contain"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 gap-3">
                  <h3 className="text-lg font-semibold text-left">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 text-left">
                    {product.desc}
                  </p>

                  <div className="flex justify-between items-center ">
                    <span className="font-bold">EGP {product.price}</span>
                    {/* <span className="text-xs text-gray-500">
                      {isDevice ? colorCount : ""}
                      {isLiquid ? flavorCount : ""}
                    </span> */}
                    <div className="text-yellow-400 text-sm">
                      ★★★★☆
                      <span className="text-gray-600 text-xs ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 mt-auto">
                    <Link
                      className={`w-[95%] text-center py-2 rounded-lg text-white transition bg-[#4E0000] hover:bg-transparent hover:text-[#4E0000] hover:border hover:border-[#4E0000] `}
                      to={`/product/${product.id}`}
                    >
                      <button>
                        {isArabic ? " تفاصيل المنتج" : "View Details"}
                      </button>
                    </Link>

                    <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
