


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: ""
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // 🔄 FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get("/products");
        const p = res.data.find(i => i._id === id);
        if (p) setForm(p);
      } catch (err) {
        toast.error("Failed to load product ❌");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✏️ UPDATE PRODUCT
  const update = async () => {
    if (!form.name || !form.price) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await API.put(`/products/${id}`, form);

      toast.success("Product Updated ✅");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);

    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🌀 PAGE LOADING
  if (pageLoading) {
    return (
      <div className="text-center py-20 text-blue-600 animate-pulse">
        Loading product...
      </div>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto">

      <h2 className="text-3xl mb-4 font-bold text-white">
        Edit Product
      </h2>

      <input
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="border p-3 w-full mb-4 rounded"
        placeholder="Product Name"
      />

      <input
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
        className="border p-3 w-full mb-4 rounded"
        placeholder="Price"
      />

      <button
        onClick={update}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>

    </div>
  );
}

export default EditProduct;