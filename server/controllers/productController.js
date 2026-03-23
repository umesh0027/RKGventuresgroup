const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
// CREATE


exports.createProduct = async (req, res) => {
  try {
    const images = [];

    for (let file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      images.push(result.secure_url);
    }

    const product = await Product.create({
      ...req.body,
      images
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Upload error" });
  }
};
// READ
exports.getProducts = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;

  try {
    const products = await Product.find()
      .populate("category")
      .limit(Number(limit))
      .skip(Number(skip));

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products" });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};



exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { limit = 5, skip = 0 } = req.query;

  try {
    const products = await Product.find({ category: categoryId })
      .populate("category")
      .limit(Number(limit))
      .skip(Number(skip));

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products" });
  }
};
