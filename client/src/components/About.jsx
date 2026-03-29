import Footer from "../components/Footer";
import logo from "../assets/logo1.png";

function About() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Delivering trusted healthcare solutions with precision,
            quality, and innovation.
          </p>
        </div>

        {/* MAIN SECTION */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE / LOGO */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Company Logo"
              className="w-72 md:w-96 drop-shadow-xl animate-pulse  "
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-800">CATALOGUE</span><br />
              <span className="text-blue-600">
                Health Care Products
              </span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We are manufacturers of a wide range of surgical,
              orthopedic, and medical products — offering everything
              from lower to premium quality. Trusted by healthcare
              professionals, our products are made with precision,
              durability, and care.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to provide reliable and affordable
              healthcare solutions that meet global standards and
              improve patient outcomes.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

            <div className="p-6 shadow rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                High-grade materials and strict quality checks ensure
                top performance.
              </p>
            </div>

            <div className="p-6 shadow rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Wide Range
              </h3>
              <p className="text-gray-600">
                From basic to advanced products, all in one place.
              </p>
            </div>

            <div className="p-6 shadow rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Trusted Brand
              </h3>
              <p className="text-gray-600">
                Preferred by professionals for reliability and precision.
              </p>
            </div>

          </div>
        </div>

        {/* STATS / TRUST */}
        <div className="bg-blue-600 text-white py-16 px-6 text-center">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

            <div>
              <h2 className="text-3xl font-bold">50+</h2>
              <p className="text-gray-200">Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">100+</h2>
              <p className="text-gray-200">Clients</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">5+</h2>
              <p className="text-gray-200">Years Experience</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-gray-200">Support</p>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;
