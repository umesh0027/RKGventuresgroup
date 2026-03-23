function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={product.images?.[0]}
        alt=""
        className="h-48 w-full object-cover rounded"
      />

      <h3 className="text-lg font-semibold mt-3">
        {product.name}
      </h3>

      <p className="text-blue-600 font-bold">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white w-full mt-3 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;