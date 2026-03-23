
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      return toast.error("Please enter email & password");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login Successful ✅");

      // ROLE BASED REDIRECT
      setTimeout(() => {
        if (data.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
      
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded focus:outline-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded focus:outline-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
