


import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ HANDLE ADD TO CART
  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please login first 🔒");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

     if(user?.isAdmin){
      toast.error("Admins cannot add to cart ❌");

      return;
    }

    addToCart(product, 1);
    toast.success("Added to cart 🛒");
  };

  return (
    <>
      <div className="p-10 min-h-screen bg-gray-100">

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-blue-600 text-xl font-semibold animate-pulse">
            Loading products...
          </div>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Products Available 😕
            </h2>
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard
                key={p._id}
                product={p}
                addToCart={() => handleAddToCart(p)} // 👈 IMPORTANT
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
