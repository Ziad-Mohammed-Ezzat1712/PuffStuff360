import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
  import { useLanguage } from "../../Context/LanguageContext";

export default function AllProducts() {
  const { addToCart } = useCart();
  const { isArabic } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  // ======= الفلاتر =======
  const filters = [
    { label: "ALL", type: "all", value: "" },
    { label: "LIQUID", type: "category", value: "liquid" },
    { label: "SALT", type: "category", value: "salt" },
    { label: "DISPOSABLE", type: "category", value: "disposable" },
    { label: "PODS", type: "sub", value: "Pod" },
    { label: "MOD", type: "sub", value: "mod" },
    { label: "TANK", type: "sub", value: "TANK" },
    { label: "COILS & CARTRIDGE", type: "sub", value: "Coils & Cartridges" },
    { label: "FULL KITS", type: "sub", value: "FULL_KIT" },
    { label: "ACCESSORIES", type: "category", value: "accessories" },
  ];

  // ================= FETCH =================
  useEffect(() => {
    axios
      .get(
        `https://dashboard.splash-e-liquid.com/products/getallproducts.php?nocache=${Date.now()}`
      )
      .then((res) => {
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

            return {
              id: product.product_id || Math.random(),

              // ✅ multilingual
              name_en: product.product_name_en || "No Name",
              name_ar: product.product_name_ar || "بدون اسم",

              desc_en: product.description_en
                ? product.description_en.replace(/"/g, "").slice(0, 80)
                : "No Description",
              desc_ar: product.description_ar
                ? product.description_ar.replace(/"/g, "").slice(0, 80)
                : "بدون وصف",

              category_en: product.category_en || "",
              category_ar: product.category_ar || "",

              sub_category_en: product.sub_category_en
                ? product.sub_category_en.split(",")
                : [],
              sub_category_ar: product.sub_category_ar
                ? product.sub_category_ar.split(",")
                : [],

              price: variant.price || 0,
              rating: 4.6,
              image: product.image || "",
            };
          });

          setProducts(formatted);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ================= FILTER =================
  const filteredProducts = products.filter((p) => {
    const name = isArabic ? p.name_ar : p.name_en;
    const category = isArabic ? p.category_ar : p.category_en;
    const subCategory = isArabic ? p.sub_category_ar : p.sub_category_en;

    // search
    if (searchTerm && !name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (!selectedFilter) return true;

    const filterObj = filters.find((f) => f.label === selectedFilter);
    if (!filterObj) return true;

    if (filterObj.type === "all") return true;

    if (filterObj.type === "category") {
      return (category || "").toLowerCase() === filterObj.value.toLowerCase();
    } else if (filterObj.type === "sub") {
      return (subCategory || []).some(
        (sub) => sub.toLowerCase() === filterObj.value.toLowerCase()
      );
    }

    return true;
  });

  // ================= Pagination =================
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter, isArabic]);

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <h2 className="text-[50px] mb-24 text-white text-center">
        {isArabic ? "منتجاتنا" : "Our Products"}
      </h2>

      {/* Search */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder={isArabic ? "ابحث عن منتج..." : "Search product..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border w-64"
        />
      </div>

      <div className="grid md:grid-cols-[20%_80%] gap-8">
        {/* Filters */}
        <div className="bg-white p-6 hidden md:block rounded-2xl shadow-lg h-fit sticky top-20">
          <h3 className="text-xl font-semibold mb-4">
            {isArabic ? "الفلاتر" : "Filters"}
          </h3>

          <div className="space-y-3 ">
            {filters.map((item) => (
              <div
                key={item.label}
                onClick={() =>
                  setSelectedFilter(
                    selectedFilter === item.label ? null : item.label
                  )
                }
                className={`cursor-pointer px-2 py-1 rounded-lg ${
                  selectedFilter === item.label
                    ? "bg-[#4E0000] text-white font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-3 gap-8">
          {loading && (
            <p className="text-white text-center col-span-3">
              {isArabic ? "جاري التحميل..." : "Loading..."}
            </p>
          )}

          {!loading &&
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:scale-105 transition flex flex-col"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="h-64 flex items-center rounded-xl justify-center bg-gray-100">
                    <img
                      src={product.image}
                      className="h-52 object-contain "
                    />
                  </div>
                </Link>

                <div className="p-4 flex flex-col text-left flex-1 gap-3">
                  <h3 className="font-semibold">
                    {isArabic ? product.name_ar : product.name_en}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {isArabic ? product.desc_ar : product.desc_en}
                  </p>

                  <span className="font-bold">EGP {product.price}</span>

                  <Link
                    to={`/product/${product.id}`}
                    className="mt-auto bg-[#4E0000] hover:border hover:border-[#4E0000] hover:text-[#4E0000] hover:bg-transparent text-white py-2 rounded-lg text-center"
                  >
                    {isArabic ? "تفاصيل المنتج" : "View Details"}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            {isArabic ? "السابق" : "Prev"}
          </button>

          <span className="text-white py-2">
            {isArabic ? `صفحة ${currentPage}` : `Page ${currentPage}`}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                indexOfLastProduct < filteredProducts.length
                  ? prev + 1
                  : prev
              )
            }
            disabled={indexOfLastProduct >= filteredProducts.length}
            className="px-4 py-2 bg-[#4E0000] text-white rounded"
          >
            {isArabic ? "التالي" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}