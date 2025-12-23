import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function AllProducts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    axios
      .get(
        `https://dashboard.splash-e-liquid.com/products/getallproducts.php?nocache=${Date.now()}`
      )
      .then((res) => {
        if (res.data.status) {
          const formatted = res.data.data.map((item) => ({
            id: item.product_id,
            name: item.name_en,
            desc: item.description_en
              ? item.description_en.slice(0, 80)
              : "",
            price: item.price,
            rating: 4.6, // مؤقت
            image: item.image,
            category: item.category_key,
            stock: item.stock,
          }));

          setProducts(formatted);

        }
      })
      .catch((err) => console.error(err))
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
      <h2 className="text-[50px] mb-24 text-white text-center">
        Our Products
      </h2>

      {/* Sort */}
      <div className="flex justify-end items-center gap-3 mb-6">
        <h1 className="text-gray-300 font-medium">Sort by</h1>
        <select className="bg-white text-gray-700 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#4E0000]">
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
              <div
                key={item}
                className="flex justify-between cursor-pointer"
              >
                <span>{item}</span>
                <span>{">"}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          {/* Size */}
          <h4 className="font-semibold mb-3">Size</h4>
          <div className="flex gap-3 mb-4">
            {[30, 60, 100].map((size) => (
              <button
                key={size}
                className="px-4 py-2 rounded-full bg-gray-100 border"
              >
                {size}
              </button>
            ))}
          </div>

          <hr className="my-4" />

          {/* NIC */}
          <h4 className="font-semibold mb-3">NIC</h4>
          <div className="flex flex-wrap gap-3">
            {[3, 6, 8, 12, 50].map((nic) => (
              <button
                key={nic}
                className="px-4 py-2 rounded-full bg-gray-100 border"
              >
                {nic}
              </button>
            ))}
          </div>

          <button className="w-full mt-6 bg-[#4E0000] text-white py-3 rounded-full">
            Apply Filter
          </button>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid md:grid-cols-3 gap-8">
          {loading && (
            <p className="text-white text-xl col-span-3 text-center">
              Loading products...
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
                      className="h-52 object-contain transition-transform duration-500 ease-in-out hover:animate-tilt"
                    />
                  </div>
                </Link>

                {/* Content */}
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

                    <div className="text-yellow-400 text-sm">
                      ★★★★☆
                      <span className="text-gray-600 text-xs ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 mt-auto">
                    <button className="w-[45%] border border-[#A59F9F] py-2 rounded-lg hover:bg-[#4E0000] hover:text-white transition">
                      Buy Now
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
                        ? "Adding..."
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
      </div>
    </>
  );
}
