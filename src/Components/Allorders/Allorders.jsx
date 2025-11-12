// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Allorders() {
  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <>
    <h1>hello</h1>
    </>
  )
}
