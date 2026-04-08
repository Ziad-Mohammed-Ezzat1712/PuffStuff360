import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { GiMoneyStack } from "react-icons/gi";
import { Heart } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { useWishlist } from "../../Context/WishlistContext.jsx"; // ✅ استدعاء الكونتكست
import vo from "../../assets/Images/vo.png";
import i from "../../assets/Images/in.png";

export default function ProductDetails() {

  const { id } = useParams();
  const { addToCart } = useCart();
const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // ✅

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  // ================= Fetch Product =================
  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await axios.get(`https://dashboard.splash-e-liquid.com/products/getOneProduct.php?id=${id}&_t=${Date.now()}`);

        setProduct(res.data.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);

  // ================= Default Flavor =================
  useEffect(() => {

    if (!product) return;

    if (product?.liquid?.length) {
      setSelectedFlavor(product.liquid[0]);
    }
    else if (product?.salt?.length) {
      setSelectedFlavor(product.salt[0]);
    }
    else if (product?.disposable?.length) {
      setSelectedFlavor(product.disposable[0]);
    }

    if (product?.device?.length) {
      setSelectedColor(product.device[0]);
    }

    if (product?.accessories?.length) {
      setSelectedColor(product.accessories[0]);
    }

  }, [product]);

  // ================= Quantity =================
  const increaseQty = () => {

    if (selectedFlavor?.stock && quantity < selectedFlavor.stock) {
      setQuantity((p) => p + 1);
    }

  };

  const decreaseQty = () => {

    if (quantity > 1) {
      setQuantity((p) => p - 1);
    }

  };

  // ================= Add To Cart =================
const handleAddToCart = () => {
  setLoadingId(product.data.product_id);

  // 🔥 تحديد النوع
  const isFlavor = !!selectedFlavor;
  const selectedVariant = isFlavor ? selectedFlavor : selectedColor;

  if (!selectedVariant) {
    toast.error("Please select an option");
    return;
  }

  const cartProduct = {
    product: {
      product_id: product.data.product_id,
      name_en: product.data.name_en,
      image: product.data.image,
    },

    variant: {
      variant_id: selectedVariant.variant_id,
      image: selectedVariant.images?.[0],
      price: selectedVariant.price,

      variant_info: isFlavor
        ? {
            flavor: selectedVariant.flavor_en,
            nicotine: selectedVariant.nicotine_en,
            size: selectedVariant.size_en,
            style: selectedVariant.style_en,
            color:selectedVariant.color_en,
            number_of_puffs: selectedVariant.number_of_puffs,
          }
        : {
            color: selectedVariant.color_en,
          },
    },

    quantity: quantity,
  };
  

  console.log("🛒 sending to cart:", cartProduct);

  setTimeout(() => {
    addToCart(cartProduct);
    setLoadingId(null);
    toast.success(
      isFlavor
        ? "Added to cart 🛒 " + selectedVariant.flavor_en
        : "Added to cart 🛒 " + selectedVariant.color_en
    );
  }, 600);
};

 // ================= Wishlist Toggle =================
  const handleWishlist = () => {
    const selectedVariantId = selectedFlavor?.variant_id || selectedColor?.variant_id;
    if (!selectedVariantId) {
      toast.error("Please select an option first");
      return;
    }

    if (isInWishlist(selectedVariantId)) {
      const item = wishlist.find((i) => i.variant_id === selectedVariantId);
      removeFromWishlist(item.wishlist_id);
    } else {
      addToWishlist({
        product_id: product.data.product_id,
        variant_id: selectedVariantId,
      });
    }
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

  const flavors =
    product.liquid ||
    product.salt ||
    product.disposable ||
    [];

  return (

    <div className="text-white min-h-screen px-6 md:px-20 py-16 flex flex-col md:flex-row gap-16">

      {/* ================= IMAGE ================= */}
      <div className="flex-1 flex justify-center">

        <div className="bg-white rounded-2xl h-dvh p-10 w-full max-w-md shadow-lg">

          <img
            src={
              selectedFlavor?.images?.[0] ||
              selectedColor?.images?.[0] ||
              product.data.image
            }
            alt={product.data.product_name_en}
            className="w-full h-full object-contain"
          />

        </div>

      </div>

      {/* ================= DETAILS ================= */}
      <div className="flex-1 flex flex-col space-y-6 text-left">

        <h2 className="text-3xl font-bold">
          {product.data.product_name_en}
        </h2>

        <p className="text-2xl font-semibold">
          {selectedFlavor?.price || selectedColor?.price|| product.price } EG
        </p>

        <p className="text-sm text-gray-400">
          {product.data.category_en} • {product.data.brand_en}
        </p>

        {/* ================= TYPE ================= */}
        <p className="text-gray-400 font-semibold">
          {product.data.type_en}
        </p>
   

        {/* ================= NIC / SIZE ================= */}
        {selectedFlavor && (
<>
          <div className="flex gap-10 flex-wrap">

            <div>
              <h3 className="font-semibold mb-2">NIC</h3>
              <button className="border px-4 py-2 rounded-lg">
                {selectedFlavor.nicotine_en}
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">SIZE</h3>
              <button className="border px-4 py-2 rounded-lg">
                {selectedFlavor.size_en}
              </button>
            </div>
      
          </div>
          <p className="text-gray-400 font-semibold">
          flavor : {selectedFlavor.flavor_en}
        </p>
        <p className="text-gray-400 font-semibold">
          {selectedFlavor.style_en}
        </p>
</>
        )}

{/* num-puffs */}

  {(product.disposable?.length > 0) && (

          <div>

            <div className="flex gap-3 flex-wrap">

              {(product.disposable).map((item, idx) => (

               
               <>
               
            <div className="flex gap-2 justify-between items-center text-center ">
                  
               number of puffs: <p>{item.number_of_puffs}</p>
            </div>
               </>

              ))}

            </div>

          </div>

        )}
        {/* ================= FLAVORS ================= */}

        {flavors.length > 0 && (

          <div className="mt-4">

            <h3 className="text-lg font-semibold mb-4">
              FLAVORS
            </h3>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">

              {flavors.map((flavor) => (

                <div
                  key={flavor.variant_id}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`cursor-pointer bg-white rounded-lg p-2 border-2 transition
                  ${
                    selectedFlavor?.variant_id === flavor.variant_id
                      ? "border-red-600"
                      : "border-transparent"
                  }`}
                >

                  <img
                    src={flavor.images?.[0]}
                    alt={flavor.flavor_en}
                    className="w-full h-20 object-contain"
                  />
                 <h3 className="text-black text-sm text-center">
                  {flavor.flavor_en} <br /> {flavor.nicotine_en}mg
                 </h3>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* ================= COLORS ================= */}
        {(product.device?.length > 0 || product.accessories?.length > 0) && (

          <div>

            <h3 className="text-lg font-semibold mb-3">
              Available Colors
            </h3>

            <div className="flex gap-3 flex-wrap">

              {(product.device || product.accessories).map((item, idx) => (

               
               <>
               
            <div className="flex-col justify-between items-center text-center px-4">
                  <button
                  key={idx}
                  onClick={() => setSelectedColor(item)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor?.color_id === item.color_id
                      ? "border-red-600"
                      : "border-gray-500"
                  }`}
                  style={{
                    backgroundColor:
                      item.color_en !== "undefined"
                        ? item.color_en
                        : "#999",
                  }}
                />
                <p>{item.color_en}</p>
            </div>
               </>

              ))}

            </div>

          </div>

        )}

        {/* ================= QUANTITY ================= */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center border px-4 rounded-lg">

            <button onClick={decreaseQty} className="px-2 text-xl">
              -
            </button>

            <span className="px-6 text-xl font-semibold">
              {quantity}
            </span>

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
              disabled={loadingId === product.data.product_id}
              className="bg-[#790000] px-6 py-2 rounded-lg"
            >
              {loadingId === product.data.product_id
                ? "Adding..."
                : "Add to Cart"}

              <FontAwesomeIcon
                icon={faCartShopping}
                className="ml-2"
              />
            </button>

           {/* ✅ Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={`w-10 h-10 border rounded-lg flex items-center justify-center ${
                isInWishlist(selectedFlavor?.variant_id || selectedColor?.variant_id)
                  ? "bg-red-600 text-white"
                  : ""
              }`}
            >
              <Heart size={20} />
            </button>




          </div>

        </div>

        {/* ================= PAYMENT ================= */}
        <div className="mt-6 flex gap-6 items-center">

          <h3 className="font-semibold">
            Payment Option:
          </h3>

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
            {product.data.description_en}
          </p>

        </div>

      </div>

    </div>
  );
}