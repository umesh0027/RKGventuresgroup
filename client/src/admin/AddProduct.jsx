

import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: ""
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
  }, []);

  const submit = async () => {
    if (!form.name || !form.price || !form.category) {
      return toast.error("Please fill required fields");
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(form).forEach(key => data.append(key, form[key]));

      for (let img of images) {
        data.append("images", img);
      }

      await API.post("/products", data);

      toast.success("Product Added Successfully ✅");

      // ✅ RESET FORM
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        category: ""
      });
      setImages([]);

    } catch (err) {
      toast.error("Failed to add product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Add Product
      </h2>

      <input
        value={form.name}
        placeholder="Product Name"
        className="w-full border p-3 mb-4 rounded"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        value={form.price}
        placeholder="Price"
        className="w-full border p-3 mb-4 rounded"
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input
        value={form.stock}
        placeholder="Stock"
        className="w-full border p-3 mb-4 rounded"
        onChange={e => setForm({ ...form, stock: e.target.value })}
      />

      {/* CATEGORY */}
      <select
        value={form.category}
        className="w-full border p-3 mb-4 rounded"
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <textarea
        value={form.description}
        placeholder="Description"
        className="w-full border p-3 mb-4 rounded"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="file"
        multiple
        className="mb-4"
        onChange={e => setImages(e.target.files)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>

    </div>
  );
}

export default AddProduct;
