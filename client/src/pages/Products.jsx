

import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          API.get("/products/all"),
          API.get("/categories")
        ]);

        setProducts(prodRes.data);
        setFiltered(prodRes.data);
        setCategories(catRes.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let data = [...products];

    // search
    if (search) {
  data = data.filter(p => {
    const text = search.toLowerCase();

    return (
      p.name?.toLowerCase().includes(text) ||
      p.category?.name?.toLowerCase().includes(text)
    );
  });
}

    // category
    if (selectedCat) {
      data = data.filter(p => p.category?._id === selectedCat);
    }

    setFiltered(data);
  }, [search, selectedCat, products]);

  // 🛒 ADD TO CART
  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please login first 🔒");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    if (user?.isAdmin) {
      toast.error("Admins cannot add to cart ❌");
      return;
    }

    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  return (
    <>
      <div className="p-4 md:p-10 min-h-screen bg-gray-100">

        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          Our Products
        </h2>

        {/* 🔍 FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow mb-10 flex flex-col md:flex-row gap-4 items-center justify-between mx-auto max-w-4xl">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/2 border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="w-full md:w-1/4 border p-2 rounded"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-blue-600 text-xl animate-pulse">
            Loading products...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-600">
              No Products Found 😕
            </h2>
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {filtered.map(p => (
              <ProductCard
                key={p._id}
                product={p}
                addToCart={() => handleAddToCart(p)}
              />
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Products;
