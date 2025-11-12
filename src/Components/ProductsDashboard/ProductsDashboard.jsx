// src/Components/Admin/ProductsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    brand: '',
    quantity: '',
    image: '',
    description: '',
    category: '',
    nicotine: '',
    size: '',
    flavor: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(form.quantity) <= 0) {
      toast.error('Quantity must be greater than zero.');
      return;
    }

    if (isEditing) {
      const updated = [...products];
      updated[editIndex] = { ...form };
      setProducts(updated);
      setIsEditing(false);
      setEditIndex(null);
      toast.success('Product updated successfully.');
    } else {
      const newProduct = {
        ...form,
        createdAt: new Date().toLocaleString(),
      };
      setProducts([...products, newProduct]);
      toast.success('Product added successfully.');
    }
    setForm({
      name: '',
      price: '',
      brand: '',
      quantity: '',
      image: '',
      description: '',
      category: '',
      nicotine: '',
      size: '',
      flavor: '',
    });
  };

  const handleEdit = (index) => {
    setForm({ ...products[index] });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
    toast.error('Product deleted.');
  };

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
      toast.success(`${product.name} added to cart! 🛒`);
    }, 800); // محاكاة تحميل بسيط
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Project Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 mb-10">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Brand"
          className="w-full border p-3 rounded"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full border p-3 rounded"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded"
          onChange={handleImageChange}
          required={!isEditing}
        />

        <select
          className="w-full border p-3 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Divace">Divace</option>
          <option value="Liquide">Liquide</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* حقول إضافية للـ Liquide */}
        {form.category === "Liquide" && (
          <>
            <input
              type="text"
              placeholder="Nicotine Strength (e.g. 3mg, 6mg)"
              className="w-full border p-3 rounded"
              value={form.nicotine}
              onChange={(e) => setForm({ ...form, nicotine: e.target.value })}
              required
            />

            <select
              className="w-full border p-3 rounded"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              required
            >
              <option value="">Select Size</option>
              <option value="30ml">30ml</option>
              <option value="60ml">60ml</option>
              <option value="60ml">100ml</option>
              <option value="120ml">120ml</option>
            </select>

            <input
              type="text"
              placeholder="Flavor (e.g. Strawberry, Mint)"
              className="w-full border p-3 rounded"
              value={form.flavor}
              onChange={(e) => setForm({ ...form, flavor: e.target.value })}
              required
            />
          </>
        )}

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        <button className="bg-red-600 text-white font-bold px-6 py-2 rounded hover:bg-red-500">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* عرض المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Brand: {product.brand}</p>
            <p className="text-gray-600">Price: {product.price} EGP</p>
            <p className="text-gray-600">Quantity: {product.quantity}</p>

            {product.category === "Liquide" && (
              <>
                <p className="text-gray-600">Nicotine: {product.nicotine}</p>
                <p className="text-gray-600">Size: {product.size}</p>
                <p className="text-gray-600">Flavor: {product.flavor}</p>
              </>
            )}

            <p className="mt-2">{product.description}</p>
            <p className="text-sm text-gray-500 mt-1">Added on: {product.createdAt}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-800 p-2 rounded-xl hover:bg-blue-600 font-bold text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-800 p-2 rounded-xl hover:bg-red-600 font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
