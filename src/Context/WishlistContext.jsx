import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

// APIs
const GET_API = `https://dashboard.splash-e-liquid.com/wishlist/getAllWishlist.php?nocache=${Date.now()}`;
const ADD_API = "https://dashboard.splash-e-liquid.com/wishlist/addToWishlist.php";
const DELETE_API = `https://dashboard.splash-e-liquid.com/wishlist/delete.php?nocache=${Date.now()}`;

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("userToken");

  // ================= GET =================
  const fetchWishlist = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await axios.get(GET_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD =================
  const addToWishlist = async ({ product_id, variant_id }) => {
    if (!token) return toast.error("You must be logged in");

    try {
      const formData = new FormData();
      formData.append("product_id", product_id);
      formData.append("variant_id", variant_id);

      const res = await axios.post(ADD_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Added to wishlist ❤️");
      fetchWishlist(); // تحديث
    } catch (err) {
      console.log(err);
      toast.error("Failed to add");
    }
  };

  // ================= DELETE =================
  const removeFromWishlist = async (wishlist_id) => {
    if (!token) return toast.error("You must be logged in");

    try {
      const formData = new FormData();
      formData.append("wishlist_id", wishlist_id);

      await axios.post(DELETE_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Removed from wishlist 🗑️");
      fetchWishlist();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove");
    }
  };

  // ================= CHECK IF EXIST =================
  const isInWishlist = (variant_id) => {
    return wishlist.some((item) => item.variant_id === variant_id);
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}