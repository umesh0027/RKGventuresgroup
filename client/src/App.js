



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AddProduct from "./admin/AddProduct";
import Dashboard from "./admin/Dashboard";
import ProductsAdmin from "./admin/ProductsAdmin";
import Orders from "./admin/Order";

// Protected Route
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./admin/AdminLayout";

// Context
import { CartProvider } from "./context/CartContext";

import Categories from "./admin/Categories";

import EditProduct from "./admin/EditProduct";

import ContactMessages from "./admin/ContactMessages";
import Contact from "./components/Contact";
import About from "./components/About";
import MyOrders from "./pages/MyOrders";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        {/* Navbar (hide in admin optional later) */}
        <Navbar />

        <Routes>

          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About/>} />
          <Route path="/my-orders" element={<MyOrders />} />


          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🧑‍💻 ADMIN PROTECTED ROUTES */}

          <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  {/* ✅ DEFAULT PAGE */}
  <Route index element={<Dashboard />} />

  <Route path="dashboard" element={<Dashboard />} />
  <Route path="add" element={<AddProduct />} />
  <Route path="products" element={<ProductsAdmin />} />
  <Route path="orders" element={<Orders />} />
  <Route path="categories" element={<Categories />} />
  <Route path="edit/:id" element={<EditProduct />} />
  <Route
  path="/admin/messages"
  element={
   
      <ContactMessages />
   
  }
/>
</Route>


{/* 
          <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
></Route>
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductsAdmin />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />


          <Route
  path="/admin/categories"
  element={
    <AdminRoute>
      <Categories />
    </AdminRoute>
  }
/>
<Route
  path="/admin/edit/:id"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/> */}

        </Routes>
      </BrowserRouter>
    </CartProvider>

    
  );
}

export default App;