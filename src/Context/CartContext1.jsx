// CartContext1.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const UPDATE_API = "https://dashboard.splash-e-liquid.com/cart/updateCart.php";

const DELETE_API = "https://dashboard.splash-e-liquid.com/cart/deleteFromCart.php";
const ADD_API = "https://dashboard.splash-e-liquid.com/cart/add.php";
const DISCOUNT_API = `https://dashboard.splash-e-liquid.com/discounts/getDiscountsForUser.php?nocache=${Date.now()}`;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // ---------------------------
  // FIX: Sync token correctly
  // ---------------------------
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    setToken(savedToken);
  }, []);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ---------------------------
  // Fetch Cart
  // ---------------------------
  const fetchCart = async () => {
    if (!token) return setCartItems([]); // Stop unless token is ready

    try {
      const res = await axios.get(`https://dashboard.splash-e-liquid.com/cart/getCart.php?nocache=${Date.now()}`, authHeader);

      const item = Array.isArray(res.data.data?.items) ? res.data.data?.items : [];
   
      setCartItems(item);
    } catch (err) {
      console.error(err);
      setCartItems([]);
      toast.error("Failed to fetch cart");
    }
  };

  // Fetch only when token is ready
  useEffect(() => {
    if (!token) return; // avoid empty cart on refresh
    fetchCart();
  }, [token]);

  // ---------------------------
  // Add to cart
  // ---------------------------
  const addToCart = async (product) => {
    if (!token) return toast.error("You must be logged in");

    setLoadingId(product.id);

    try {
      const formData = new FormData();
      formData.append("product_id", product.id);
      formData.append("quantity", 1);

      const res = await axios.post(ADD_API, formData, authHeader);

      if (res.data.status) {
        const addedProduct = res.data.data.product;

        setCartItems((prev) => {
          const exists = prev.find((p) => p.id === addedProduct.id);
          if (exists) {
            return prev.map((p) =>
              p.id === addedProduct.id
                ? { ...p, quantity: addedProduct.quantity }
                : p
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

  // ---------------------------
  // Remove from cart
  // ---------------------------
  const removeFromCart = async (cartItem) => {
  if (!token) return toast.error("You must be logged in");

  try {
    const formData = new FormData();
    formData.append("cart_id", cartItem.cart_id);

    await axios.post(DELETE_API, formData, authHeader);

    setCartItems((prev) => prev.filter((i) => i.cart_id !== cartItem.cart_id));

    toast.success("Item removed");
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove item");
  }
};


  // ---------------------------
  // Update quantity
  // ---------------------------
 const updateQuantity = async (cartId, quantity) => {
  if (!token) return toast.error("You must be logged in");

  try {
    const formData = new FormData();
    formData.append("cart_id", cartId);
    formData.append("quantity", quantity);

    const res = await axios.post(UPDATE_API, formData, authHeader);

    if (res.data.status) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cart_id === cartId ? { ...item, quantity } : item
        )
      );
    } else {
      toast.error(res.data.message || "Failed to update quantity");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update quantity");
  }
};

  const increaseQuantity = (item) =>
    updateQuantity(item.cart_id, item.quantity + 1);

 const decreaseQuantity = (item) => {
  if (item.quantity <= 1) {
    // لو واحد → احذف بالـ cart_id
    removeFromCart(item);
  } else {
    // لو أكتر من واحد → قلل الكمية
    updateQuantity(item.cart_id, item.quantity - 1);
  }
};

  // ---------------------------
  // Clear Cart
  // ---------------------------
  const clearCart = async () => {
    if (!token) return toast.error("You must be logged in");

    try {
      for (let item of cartItems) {
        await axios.post(DELETE_API, { id: item.id }, authHeader);
      }
      setCartItems([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  // ---------------------------
  // Total Items
  // ---------------------------
  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  // ---------------------------
  // Apply Coupon
  // ---------------------------
const applyCoupon = async () => {
  if (!couponCode) return toast.error("Enter a coupon code");

  try {
    const res = await axios.get(DISCOUNT_API);

    const productsWithCoupons = Array.isArray(res.data.data) ? res.data.data : [];

    // نجمع كل الكوبونات من المنتجات
    let matchedCoupon = null;

    productsWithCoupons.forEach((product) => {
      product.coupons.forEach((c) => {
        if (c.code.toLowerCase() === couponCode.toLowerCase()) {
          matchedCoupon = c; // يحفظ أول كوبون مطابق
        }
      });
    });

    if (!matchedCoupon) {
      toast.error("Invalid coupon code");
      setDiscount(0);
      return;
    }

    // احسب الخصم حسب النسبة
    let subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    let discountAmount = 0;

    if (matchedCoupon.type === "percent") {
      discountAmount = (subtotal * matchedCoupon.value) / 100;
    } else if (matchedCoupon.type === "fixed") {
      discountAmount = matchedCoupon.value;
    }

    setDiscount(discountAmount);

    toast.success(
      `Coupon applied! You saved ${discountAmount.toFixed(2)} EG`
    );
  } catch (err) {
    console.error(err);
    toast.error("Failed to apply coupon");
    setDiscount(0);
  }
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
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
