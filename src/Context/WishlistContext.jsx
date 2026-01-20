// // WishlistContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("userToken"); // توكن المستخدم

//   const API = {
//     add: "https://dashboard.splash-e-liquid.com/wishlist/addToWishlist.php",
//     getAll: `https://dashboard.splash-e-liquid.com/wishlist/getAllWishlist.php?nocache=${Date.now()}`,
//     delete: "https://dashboard.splash-e-liquid.com/wishlist/delete.php",
//   };

//   // ===== Fetch wishlist =====
//   const fetchWishlist = async () => {
//     if (!token) {
//       toast.error("You must be logged in");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(API.getAll, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.status) {
//         const items = Array.isArray(res.data.data) ? res.data.data : [];
//         setWishlistItems(items);
//         setWishlistCount(items.length);
//       } else {
//         toast.error(res.data.message || "Failed to fetch wishlist");
//         setWishlistItems([]);
//         setWishlistCount(0);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch wishlist");
//       setWishlistItems([]);
//       setWishlistCount(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===== Add to wishlist =====
//   const addToWishlist = async (product_id) => {
//     if (!token) return toast.error("You must be logged in");

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         API.add,
//         { product_id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.status) {
//         toast.success(res.data.message);
//         fetchWishlist(); // تحديث الليستة بعد الإضافة
//       } else {
//         toast.error(res.data.message || "Failed to add to wishlist");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add to wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===== Remove from wishlist =====
//   const removeFromWishlist = async (wishlist_id) => {
//     if (!token) return toast.error("You must be logged in");

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         API.delete,
//         { wishlist_id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.status) {
//         toast.success(res.data.message);
//         fetchWishlist(); // تحديث الليستة بعد الحذف
//       } else {
//         toast.error(res.data.message || "Failed to remove from wishlist");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to remove from wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===== Fetch wishlist on token change =====
//   useEffect(() => {
//     if (token) fetchWishlist();
//   }, [token]);

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems,
//         wishlistCount,
//         loading,
//         addToWishlist,
//         removeFromWishlist,
//         fetchWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// // ===== Hook =====
// export const useWishlist = () => useContext(WishlistContext);
