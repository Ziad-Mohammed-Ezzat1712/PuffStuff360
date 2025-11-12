// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function NotFound() {
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
    <h1 className='text-white text-2xl'>NotFound</h1>
    </>
  )
}
