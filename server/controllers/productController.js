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
// exports.getProducts = async (req, res) => {
//   const products = await Product.find().populate("category");
//   res.json(products);
// };

exports.getProducts = async (req, res) => {
  const { limit = 6, skip = 0 } = req.query;

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
// exports.updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// };
exports.updateProduct = async (req, res) => {
  try {
    let images = [];

    // 👉 agar new images upload hui
    if (req.files && req.files.length > 0) {

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
    }

    const updateData = {
      ...req.body,
    };

    // 👉 agar new images hai to replace karo
    if (images.length > 0) {
      updateData.images = images;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);

  } catch (err) {
    res.status(500).json({ msg: "Update error" });
  }
};
// DELETE
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};



exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { limit = 6, skip = 0 } = req.query;

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

// get all products without pagination
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products" });
  }
};

// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching product" });
  }
};
