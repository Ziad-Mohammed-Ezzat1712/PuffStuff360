import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext1.jsx";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const PRODUCTS_API = `https://dashboard.splash-e-liquid.com/products/getallproducts.php?nocache=${Date.now()}`;

export default function AllProducts() {
  const { addToCart, loadingId } = useCart();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(PRODUCTS_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status && Array.isArray(res.data.data)) {
          setProducts(res.data.data);
          console.log(res.data.data);
          
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.product_id} className="bg-white rounded-xl shadow-md overflow-hidden p-4">
          <Link to={`/product/${product.product_id}`}>
            <img
              src={
                product.image ||
                (product.device?.[0]?.images?.[0]) ||
                (product.liquid?.images?.[0]) ||
                ""
              }
              alt={product.name_en}
              className="h-52 object-contain"
            />
          </Link>
          <h3 className="text-lg font-semibold mt-2">{product.name_en}</h3>
          <p className="text-gray-500 text-sm">{product.description_en}</p>
          <p className="font-bold mt-1">EGP {product.price}</p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => addToCart(product)}
              disabled={loadingId === product.product_id}
              className={`flex-1 py-2 rounded-lg text-white ${
                loadingId === product.product_id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4E0000] hover:bg-[#5a0202]"
              }`}
            >
              {loadingId === product.product_id ? "Adding..." : "Add to Cart"}
            </button>
            <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
              <Heart size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
