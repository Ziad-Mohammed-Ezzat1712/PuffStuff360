import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { GiMoneyStack } from "react-icons/gi";
import { Heart } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

import vo from "../../assets/Images/vo.png";
import i from "../../assets/Images/in.png";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  // 🔥 device / accessories color
  const [selectedColor, setSelectedColor] = useState(null);

  // ================= Fetch Product =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dashboard.splash-e-liquid.com/products/getOneProduct.php?id=${id}`
        );
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ================= Default Color =================
  useEffect(() => {
    if (product?.device?.length) {
      setSelectedColor(product.device[0]);
    } else if (product?.accessories?.length) {
      setSelectedColor(product.accessories[0]);
    }
  }, [product]);

  // ================= Quantity =================
  const increaseQty = () => {
    if (quantity < product.stock) setQuantity((p) => p + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };

  // ================= Add To Cart =================
  const handleAddToCart = () => {
    setLoadingId(product.product_id);

    const cartProduct = {
      ...product,
      id: product.product_id,
      quantity,
      selectedColor: selectedColor
        ? {
            color_id: selectedColor.color_id,
            color_en: selectedColor.color_en,
            image: selectedColor.images?.[0],
          }
        : null,
    };

    setTimeout(() => {
      addToCart(cartProduct);
      setLoadingId(null);
      toast.success(`${product.name_en} added to cart 🛒`);
    }, 600);
  };

  // ================= Loading =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="text-white min-h-screen px-6 md:px-20 py-16 flex flex-col md:flex-row gap-16">

      {/* ================= IMAGE ================= */}
      <div className="flex-1 flex justify-center">
        <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg">
          <img
            src={selectedColor?.images?.[0] || product.image}
            alt={product.name_en}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="flex-1 flex flex-col space-y-6 text-left">

        <h2 className="text-3xl font-bold">{product.name_en}</h2>

        <p className="text-2xl font-semibold">{product.price} EG</p>

        <p className="text-sm text-gray-400">
          {product.category?.name_en} • {product.brand?.name_en}
        </p>

        {/* ================= TYPE / STYLE ================= */}
       {product.vaping_style?.name_en &&
  product.category_key !== "device" &&
  product.category_key !== "accessories" && (
    <p className="text-gray-400 font-semibold">
      {product.vaping_style.name_en}
    </p>
)}

        {/* ================= FLAVOR ================= */}
        {(product.liquid || product.salt || product.disposable) && (
          <div>
            <h3 className="text-lg font-semibold mb-2">FLAVOR</h3>
            <p className="text-gray-300">
              {product.liquid?.flavor_en ||
                product.salt?.flavor_en ||
                product.disposable?.flavor_en}
            </p>
          </div>
        )}

            {/* ================= FLAVOR ================= */}
        {(product.liquid || product.salt || product.disposable) && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Type</h3>
            <p className="text-gray-300">
              {product.liquid?.type_en ||
                product.salt?.type_en ||
                product.disposable?.type_en}
            </p>
          </div>
        )}

        {/* ================= NIC / SIZE ================= */}
        <div className="flex gap-10 flex-wrap">
          {(product.liquid || product.salt || product.disposable) && (
            <>
              <div>
                <h3 className="font-semibold mb-2">NIC</h3>
                <button className="border px-4 py-2 rounded-lg">
                  {product.liquid?.nicotine_en ||
                    product.salt?.nicotine_en ||
                    product.disposable?.nicotine_en}
                </button>
              </div>

              <div>
                <h3 className="font-semibold mb-2">SIZE</h3>
                <button className="border px-4 py-2 rounded-lg">
                  {product.liquid?.size_en ||
                    product.salt?.size_en ||
                    product.disposable?.size_en}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ================= DEVICE / ACCESSORIES COLORS ================= */}
        {(product.device?.length > 0 || product.accessories?.length > 0) && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Available Colors
            </h3>

            <div className="flex gap-3 flex-wrap">
              {(product.device || product.accessories).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(item)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor?.color_id === item.color_id
                      ? "border-[#790000]"
                      : "border-gray-500"
                  }`}
                  title={item.color_en}
                  style={{
                    backgroundColor:
                      item.color_en !== "undefined"
                        ? item.color_en
                        : "#999",
                  }}
                />
              ))}
            </div>

            {selectedColor && (
              <p className="mt-2 text-sm text-gray-400">
                Selected:{" "}
                <span className="text-white font-semibold">
                  {selectedColor.color_en}
                </span>
              </p>
            )}
          </div>
        )}

        {/* ================= QUANTITY ================= */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border px-4 rounded-lg">
            <button onClick={decreaseQty} className="px-2 text-xl">
              -
            </button>
            <span className="px-6 text-xl font-semibold">{quantity}</span>
            <button onClick={increaseQty} className="px-2 text-xl">
              +
            </button>
          </div>

          <div className="flex gap-4">
            <button className="border px-6 py-2 rounded-lg">
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              disabled={loadingId === product.product_id}
              className="bg-[#790000] px-6 py-2 rounded-lg"
            >
              {loadingId === product.product_id ? "Adding..." : "Add to Cart"}
              <FontAwesomeIcon icon={faCartShopping} className="ml-2" />
            </button>

            <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* ================= PAYMENT ================= */}
        <div className="mt-6 flex gap-6 items-center">
          <h3 className="font-semibold">Payment Option:</h3>
          <img src={vo} className="w-8 h-8" />
          <img src={i} className="w-8 h-8" />
          <GiMoneyStack className="w-10 h-10 text-emerald-600" />
        </div>

        {/* ================= ABOUT ================= */}
        <div className="pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-3">
            About This Item
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {product.description_en}
          </p>
        </div>
      </div>
    </div>
  );
}
