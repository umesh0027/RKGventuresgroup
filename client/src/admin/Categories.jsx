import { useEffect, useState } from "react";
import API from "../services/api";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetch = () => {
    API.get("/categories").then(res => setCategories(res.data));
  };

  useEffect(() => {
    fetch();
  }, []);

  const addCategory = async () => {
    await API.post("/categories", { name });
    setName("");
    fetch();
  };

  const deleteCategory = async (id) => {
    await API.delete(`/categories/${id}`);
    fetch();
  };

  return (
    <div className=" bg-gray-100 min-h-screen rounded-md  ">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 p-6">
        Categories
      </h2>

      {/* ADD */}
      <div className="flex gap-4 mb-6 mx-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
          className="border p-2 rounded-md w-64"
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-md"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      {categories.map(c => (
        <div key={c._id} className="flex justify-between bg-white p-3 mb-2 rounded shadow">
          <span>{c.name}</span>
          <button
            onClick={() => deleteCategory(c._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Categories;