// CartContext1.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const UPDATE_API = "https://dashboard.splash-e-liquid.com/cart/updateCart.php";
const GET_API = "https://dashboard.splash-e-liquid.com/cart/getCart.php";
const DELETE_API = "https://dashboard.splash-e-liquid.com/cart/deleteFromCart.php";
const ADD_API = "https://dashboard.splash-e-liquid.com/cart/add.php";
const DISCOUNT_API = "https://dashboard.splash-e-liquid.com/discounts/getAllDiscounts.php";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const token = localStorage.getItem("userToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch Cart
  const fetchCart = async () => {
    if (!token) return setCartItems([]);
    try {
      const res = await axios.get(GET_API, authHeader);
      const items = Array.isArray(res.data.data) ? res.data.data : [];
      setCartItems(items);
    } catch (err) {
      console.error(err);
      setCartItems([]);
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Add to cart
  const addToCart = async (product) => {
    if (!token) return toast.error("You must be logged in");
    setLoadingId(product.product_id);
    try {
      const formData = new FormData();
      formData.append("product_id", product.product_id);
      formData.append("quantity", 1);

      const res = await axios.post(ADD_API, formData, { headers: { Authorization: `Bearer ${token}` } });

      if (res.data.status) {
        const addedProduct = res.data.data.product;
        setCartItems((prev) => {
          const exists = prev.find((p) => p.product_id === addedProduct.product_id);
          if (exists) {
            return prev.map((p) =>
              p.product_id === addedProduct.product_id ? { ...p, quantity: addedProduct.quantity } : p
            );
          } else {
            return [...prev, addedProduct];
          }
        });
        toast.success(`${addedProduct.name_en} added to cart! 🛒`);
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoadingId(null);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!token) return toast.error("You must be logged in");
    try {
      await axios.post(DELETE_API, { product_id: productId }, authHeader);
      setCartItems((prev) => (Array.isArray(prev) ? prev.filter((item) => item.id !== productId) : []));
      toast.success("Item removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!token) return toast.error("You must be logged in");
    try {
      await axios.post(UPDATE_API, { product_id: productId, quantity }, authHeader);
      setCartItems((prev) =>
        Array.isArray(prev) ? prev.map((item) => (item.id === productId ? { ...item, quantity } : item)) : []
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const increaseQuantity = (item) => updateQuantity(item.id, item.quantity + 1);
  const decreaseQuantity = (item) =>
    item.quantity <= 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity - 1);

  const clearCart = async () => {
    if (!token) return toast.error("You must be logged in");
    try {
      for (let item of cartItems) {
        await axios.post(DELETE_API, { product_id: item.id }, authHeader);
      }
      setCartItems([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0)
    : 0;

  // Apply Coupon
  const applyCoupon = async () => {
    if (!couponCode) return toast.error("Enter a coupon code");
    try {
      const res = await axios.get(DISCOUNT_API);
      const discounts = Array.isArray(res.data.data) ? res.data.data : [];
      const matched = discounts.find((d) => d.code.toLowerCase() === couponCode.toLowerCase());

      if (matched) {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discountAmount = (subtotal * matched.discount_percentage) / 100;
        setDiscount(discountAmount);
        toast.success(`Coupon applied! You saved ${discountAmount} EG`);
      } else {
        toast.error("Invalid coupon code");
        setDiscount(0);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply coupon");
      setDiscount(0);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: Array.isArray(cartItems) ? cartItems : [],
        loadingId,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        fetchCart,
        couponCode,
        setCouponCode,
        discount,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
