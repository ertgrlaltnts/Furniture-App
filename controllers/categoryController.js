const Category = require("../models/Category");
const Furniture = require("../models/Furniture");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).render("categories", {
      page_name: "categories",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.getFurnituresWithCategory = async (req, res) => {
  const categorySlug = req.params.slug;
  const category = await Category.findOne({slug : categorySlug});

  let filter = {};

  if(categorySlug){
    filter = {category : category}
  }

  const furnitures = await Furniture.find(filter);
  res.status(200).render('furnitures' , {
    page_name : 'furnitures',
    furnitures
  })

  };