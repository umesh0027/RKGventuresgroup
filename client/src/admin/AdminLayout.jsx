


import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `flex flex-col items-center text-xs ${
      isActive ? "text-blue-600" : "text-gray-500"
    }`;

  return (
    <div className="flex min-h-screen">

      {/* 🖥️ DESKTOP SIDEBAR */}
      <div className="hidden md:block w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-2">

          <li><NavLink to="/admin/dashboard" className={navClass}>📊 Dashboard</NavLink></li>
          <li><NavLink to="/admin/add" className={navClass}>➕ Add Product</NavLink></li>
          <li><NavLink to="/admin/products" className={navClass}>📦 Products</NavLink></li>
          <li><NavLink to="/admin/orders" className={navClass}>🧾 Orders</NavLink></li>
          <li><NavLink to="/admin/categories" className={navClass}>📂 Categories</NavLink></li>
          <li><NavLink to="/admin/messages" className={navClass}>💬 Messages</NavLink></li>

        </ul>
      </div>

      {/* 📄 MAIN CONTENT */}
      <div className="flex-1 p-5 md:p-10 bg-blue-800 pb-20 md:pb-10">
        <Outlet />
      </div>

      {/* 📱 MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow md:hidden flex justify-around py-2 z-50">

        <NavLink to="/admin/dashboard" className={mobileNavClass}>
          <span>📊</span>
          <span>Home</span>
        </NavLink>

        <NavLink to="/admin/products" className={mobileNavClass}>
          <span>📦</span>
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/add" className={mobileNavClass}>
          <span>➕</span>
          <span>Add</span>
        </NavLink>

        <NavLink to="/admin/orders" className={mobileNavClass}>
          <span>🧾</span>
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/messages" className={mobileNavClass}>
          <span>💬</span>
          <span>Msg</span>
        </NavLink>

      </div>

    </div>
  );
}

export default AdminLayout;