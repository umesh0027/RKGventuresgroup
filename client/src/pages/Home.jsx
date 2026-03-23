

import { useEffect, useState } from "react";
import API from "../services/api";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import GetInTouch from "../components/GetInTouch";
import Testimonials from "../components/Testimonials";

function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState(false);

  // Load categories
  useEffect(() => {
    API.get("/categories").then(res => {
      setCategories(res.data);
    });

    // load all products initially
    loadProducts("all", 0, true);
  }, []);

  // Load products when category changes
  useEffect(() => {
    loadProducts(selectedCat, 0, true);
  }, [selectedCat]);

  

  const loadProducts = async (catId, skipVal, reset = false) => {
  setLoading(true);

  let url =
    catId === "all"
      ? `/products?limit=5&skip=${skipVal}`
      : `/products/category/${catId}?limit=5&skip=${skipVal}`;

  const res = await API.get(url);

  if (reset) {
    setProducts(res.data);
    setSkip(5);
  } else {
    // 🔥 REMOVE DUPLICATES
    setProducts(prev => {
      const newProducts = [...prev, ...res.data];

      const uniqueProducts = newProducts.filter(
        (item, index, self) =>
          index === self.findIndex(p => p._id === item._id)
      );

      return uniqueProducts;
    });

    setSkip(skipVal + 5);
  }

  setLoading(false);
};

  return (
    <div>
      <Hero />

      {/* SHOP BY CATEGORY */}

      <div className="p-10 bg-gray-100 min-h-screen">

        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Shop by Categories
        </h2>

        
        {/* <div className="flex flex-wrap justify-center gap-4 py-8">

         
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-5 py-2 rounded-full border ${
              selectedCat === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
          >
            All Products
          </button>

         
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCat(cat._id)}
              className={`px-5 py-2 rounded-full border ${
                selectedCat === cat._id
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div> */}


        <div className="py-6">

  {/* MOBILE SCROLL */}
  <div className="flex md:flex-wrap gap-3 overflow-x-auto md:overflow-visible px-2 md:px-0 scrollbar-hide">

    {/* ALL PRODUCTS */}
    <button
      onClick={() => setSelectedCat("all")}
      className={`whitespace-nowrap px-4 py-2 text-sm md:text-base rounded-full border transition ${
        selectedCat === "all"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-100 hover:bg-blue-100"
      }`}
    >
      All Products
    </button>

    {/* CATEGORY BUTTONS */}
    {categories.map(cat => (
      <button
        key={cat._id}
        onClick={() => setSelectedCat(cat._id)}
        className={`whitespace-nowrap px-4 py-2 text-sm md:text-base rounded-full border transition ${
          selectedCat === cat._id
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md scale-105"
            : "bg-gray-100 hover:bg-blue-100"
        }`}
      >
        {cat.name}
      </button>
    ))}

  </div>

</div>

  

  {/* 🌀 LOADING */}
  {loading && (
    <div className="text-center py-20 text-blue-600 text-xl font-semibold animate-pulse">
      Loading products...
    </div>
  )}

  {/* ❌ NO PRODUCTS */}
  {!loading && products.length === 0 && (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-gray-600">
        No Products Found 😕
      </h2>
      <p className="text-gray-400 mt-2">
        Try selecting another category
      </p>
    </div>
  )}

  {/* ✅ PRODUCTS */}
  {!loading && products.length > 0 && (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">

        {products.map(p => (
          <div
            key={p._id}
            className="bg-white p-3 rounded shadow transition transform hover:-translate-y-2 hover:shadow-lg"
          >
            <img
              src={p.images?.[0] || "https://via.placeholder.com/200"}
              alt=""
              className="h-32 w-full object-cover rounded"
            />

            <h3 className="text-sm mt-2 font-semibold">
              {p.name}
            </h3>

            <p className="text-blue-600 text-sm">
              ₹{p.price}
            </p>
          </div>
        ))}

      </div>

      {/* VIEW MORE */}
      <div className="text-center mt-6">
        <button
          onClick={() => loadProducts(selectedCat, skip)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          View More
        </button>
      </div>
    </>
  )}

</div>
      {/* <div className="p-10 bg-white">

        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Shop by Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

         
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-5 py-2 rounded-full border ${
              selectedCat === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
          >
            All Products
          </button>

         
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCat(cat._id)}
              className={`px-5 py-2 rounded-full border ${
                selectedCat === cat._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

   
      <div className="p-10 bg-gray-100 min-h-screen">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer  ">

          {products.map(p => (
            <div key={p._id} className="bg-white p-3 rounded shadow  transition transform hover:-translate-y-2 hover:shadow-lg">

              <img
                src={p.images?.[0] || "https://via.placeholder.com/200"}
                alt=""
                className="h-32 w-full object-cover rounded"
              />

              <h3 className="text-sm mt-2 font-semibold">
                {p.name}
              </h3>

              <p className="text-blue-600 text-sm">
                ₹{p.price}
              </p>

            </div>
          ))}

        </div>

       
        <div className="text-center mt-6">
          <button
            onClick={() => loadProducts(selectedCat, skip)}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            View More
          </button>
        </div>

      </div> */}
      <GetInTouch/>

      <Testimonials/>
<Footer/>
    </div>
    
  );
}

export default Home;
