import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// APIs
const GET_API = `https://dashboard.splash-e-liquid.com/cart/getCart.php?nocache=${Date.now()}`;
const ADD_API = `https://dashboard.splash-e-liquid.com/cart/add.php`;
const UPDATE_API = `https://dashboard.splash-e-liquid.com/cart/updateCart.php`;
const DELETE_API = `https://dashboard.splash-e-liquid.com/cart/deleteFromCart.php`;
const DISCOUNT_API = `https://dashboard.splash-e-liquid.com/discounts/getDiscountsForUser.php`;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [token, setToken] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, []);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================
  // FETCH CART
  // =========================
  const fetchCart = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${GET_API}?nocache=${Date.now()}`, authHeader);
      const items = res.data.data?.items || [];
      const summary = res.data.data?.summary || null;
      setCartItems(items);
      setCartSummary(summary);
    } catch (err) {
      console.error(err);
      setCartItems([]);
      setCartSummary(null);
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  // =========================
  // ADD TO CART (variant_id)
  // =========================
const addToCart = async (cartProduct) => {
  if (!token) return toast.error("You must be logged in");

  const variantId = cartProduct?.variant?.variant_id;
  if (!variantId) return toast.error("Variant not found");

  setLoadingId(variantId);

  try {
    const formData = new FormData();
    formData.append("variant_id", variantId);
    formData.append("quantity", cartProduct.quantity || 1);

    const res = await axios.post(ADD_API, formData, authHeader);

    if (res.data.status) {
      // toast.success("Added to cart 🛒");
      await fetchCart();
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to add product");
  } finally {
    setLoadingId(null);
  }
};

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = async (item) => {
    if (!token) return toast.error("You must be logged in");

    try {
      const formData = new FormData();
      formData.append("cart_id", item.cart_id);

      await axios.post(DELETE_API, formData, authHeader);
      toast.success("Item removed");
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (cartId, quantity) => {
    if (!token) return toast.error("You must be logged in");

    try {
      const formData = new FormData();
      formData.append("cart_id", cartId);
      formData.append("quantity", quantity);

      const res = await axios.post(UPDATE_API, formData, authHeader);

      if (res.data.status) {
        await fetchCart();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const increaseQuantity = (item) => updateQuantity(item.cart_id, item.quantity + 1);
  const decreaseQuantity = (item) =>
    item.quantity <= 1 ? removeFromCart(item) : updateQuantity(item.cart_id, item.quantity - 1);

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = async () => {
    if (!token) return;

    try {
      for (let item of cartItems) {
        const formData = new FormData();
        formData.append("cart_id", item.cart_id);
        await axios.post(DELETE_API, formData, authHeader);
      }
      toast.success("Cart cleared");
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  // =========================
  // TOTALS FROM API
  // =========================
  const totalItems = cartSummary?.total_items || 0;
  const subtotal = cartSummary?.subtotal || 0;
  const grandTotal = cartSummary?.grand_total || 0;

  // =========================
  // APPLY COUPON
  // =========================
  const applyCoupon = async () => {
    if (!couponCode) return toast.error("Enter coupon code");

    try {
      const res = await axios.get(DISCOUNT_API,authHeader);
      const products = res.data.data || [];

      let matchedCoupon = null;
      products.forEach((p) => {
        p.coupons.forEach((c) => {
          if (c.code.toLowerCase() === couponCode.toLowerCase()) matchedCoupon = c;
        });
      });

      if (!matchedCoupon) {
        toast.error("Invalid coupon");
        setDiscount(0);
        return;
      }

      let discountAmount = matchedCoupon.type === "percent" ? (subtotal * matchedCoupon.value) / 100 : matchedCoupon.value;
      setDiscount(discountAmount);
      toast.success(`Saved ${discountAmount.toFixed(2)} EGP 🎉`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply coupon");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSummary,
        loadingId,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        subtotal,
        grandTotal,
        couponCode,
        setCouponCode,
        discount,
        applyCoupon,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}