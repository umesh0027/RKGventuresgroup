
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: ""
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // new images
  const [preview, setPreview] = useState([]); // preview images

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // 🔄 FETCH PRODUCT + CATEGORIES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          API.get(`/products/${id}`),
          API.get("/categories")
        ]);

        const p = prodRes.data;

        setForm({
          name: p.name || "",
          price: p.price || "",
          stock: p.stock || "",
          description: p.description || "",
          category: p.category?._id || ""
        });

        setPreview(p.images || []);
        setCategories(catRes.data);

      } catch (err) {
        toast.error("Failed to load product ❌");
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 📸 HANDLE IMAGE CHANGE
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    // preview
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // ✏️ UPDATE PRODUCT
  const update = async () => {
    if (!form.name || !form.price) {
      return toast.error("Please fill required fields");
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(form).forEach(key => {
        data.append(key, form[key]);
      });

      // images
      images.forEach(img => {
        data.append("images", img);
      });

      await API.put(`/products/${id}`, data);

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
    <div className="p-4 md:p-10 max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Edit Product
      </h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        {/* NAME */}
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-3 w-full rounded"
          placeholder="Product Name"
        />

        {/* PRICE */}
        <input
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="border p-3 w-full rounded"
          placeholder="Price"
        />

        {/* STOCK */}
        <input
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
          className="border p-3 w-full rounded"
          placeholder="Stock"
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="border p-3 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-3 w-full rounded"
          placeholder="Description"
        />

        {/* IMAGE INPUT */}
        <input
          type="file"
          multiple
          className="border p-2 w-full"
          onChange={handleImageChange}
        />

        {/* IMAGE PREVIEW */}
        <div className="flex gap-3 flex-wrap">
          {preview.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="h-20 w-20 object-cover rounded border"
            />
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={update}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </div>

    </div>
  );
}

export default EditProduct;
