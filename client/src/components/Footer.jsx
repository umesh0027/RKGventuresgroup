import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5 mt-10">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* LOGO + ABOUT */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="logo" className="h-12" />
            <h2 className="text-xl font-bold">
              CATALOGUE <br />
              <span className="text-blue-500">
                Health Care Products
              </span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            We are manufactures of a wide range of surgical, Orthopedics,
            and medical products offering everything from lower to premium
            quality. Trusted by professionals, made with precision.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-500">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-500">
            Contact
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            📍 H No C-104, Laxmi park, Near Laxmi Mandir Nangloi , Delhi - 110041
          </p>
          <p className="text-gray-400 text-sm mb-2">
            📞 +91 8368319749 , +91 8860543933 
          </p>
          <p className="text-gray-400 text-sm">
            ✉️ rkgventuresgroup@gmail.com
          </p>
        </div>

        {/* WORKING HOURS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-500">
            Working Hours
          </h3>
          <p className="text-gray-400 text-sm">
            Mon - Sat: 9:00 AM - 7:00 PM
          </p>
          <p className="text-gray-400 text-sm">
            Sunday: Closed
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Healthcare Products. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;