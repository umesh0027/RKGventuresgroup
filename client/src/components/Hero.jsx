import heroImg from "../assets/logo.png"; // 👉 apni image daalo
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white min-h-[80vh] flex items-center px-6 md:px-16">

      <div className="grid md:grid-cols-2 gap-10 items-center w-full">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
           CATALOGUE <br />
            <span className="text-blue-600">
              Health Care Products
            </span>
          </h1>

          <p className="text-gray-600 text-lg">
            We are manufactures of a wide range of surgical , Orthopedics , and medical products  offering everything from lower to premium quality. Trusted by professionals, made with precision.
          </p>
          <p className="mt-6 text-yellow-800 font-medium text-lg md:text-base">
            Looking for bulk orders or wholesale supply? 
Get in touch with our team for the best pricing and customized solutions. 
We are committed to delivering quality products at scale with complete reliability.
          </p>

          <div className="flex gap-4">
            <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Explore Products →
            </Link>

            <Link to="/contact" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition hover:bg-gray-400">
              Contact Us
            </Link>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">

          {/* Glow Background */}
          <div className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>

          <img
            src={heroImg}
            alt="medical"
            className="relative w-[300px] md:w-[400px] animate-float"
          />

        </div>

      </div>

    </div>
  );
}

export default Hero;
