const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const cat = await Category.create(req.body);
  res.json(cat);
};

exports.getCategories = async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};