




import { useEffect, useState } from "react";
import API from "../services/api";

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  // Fetch categories
  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
  }, []);

  // Fetch products (with category filter)
  useEffect(() => {
    if (selectedCat) {
      API.get(`/products/category/${selectedCat}`)
        .then(res => setProducts(res.data));
    } else {
      API.get("/products").then(res => setProducts(res.data));
    }
  }, [selectedCat]);

  // DELETE
  const deleteProduct = async (id) => {
    if (window.confirm("Delete product?")) {
      await API.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen ">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Manage Products
      </h2>

      {/* CATEGORY FILTER */}
      <div className="mb-6">
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS GRID */}
   {/* PRODUCTS GRID */}

{products.length === 0 ? (
  <div className="text-center py-20 w-full">

    <h2 className="text-2xl font-semibold text-gray-600">
      No Products Found 😕
    </h2>

    <p className="text-gray-400 mt-2">
      {selectedCat
        ? "No products in this category"
        : "No products available"}
    </p>

  </div>
) : (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {products.map(p => (
      <div key={p._id} className="bg-white p-4 rounded shadow">

        <img
          src={p.images?.[0] || "https://via.placeholder.com/200"}
          alt=""
          className="h-40 w-full object-cover rounded"
        />

        <h3 className="font-bold mt-2">{p.name}</h3>
        <p className="text-blue-600">₹{p.price}</p>

        <div className="flex justify-between mt-3">

          <button
            onClick={() => window.location.href = `/admin/edit/${p._id}`}
            className="text-green-600"
          >
            Edit
          </button>

          <button
            onClick={() => deleteProduct(p._id)}
            className="text-red-500"
          >
            Delete
          </button>

        </div>

      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default ProductsAdmin;
