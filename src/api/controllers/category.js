const categoryServices = require("../services/category.service");

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryServices.findAll(req.query);
    res.status(200).json({
      message: "Get All Categories",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const getOneCategory = async (req, res) => {
  try {
    const categories = await categoryServices.findOne(req.params);
    res.status(200).json({
      message: "Get Categories",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const newCategory = async (req, res) => {
  try {
    const categories = await categoryServices.create(req.body);
    res.status(201).json({
      message: "Create New Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (req, res) => {
  try {
    const categories = await categoryServices.update(req.params, req.body);
    res.status(200).json({
      message: "Update Category Succesfully",
      data: categories,
    });
  } catch (error) {}
};

const deleteCategory = async (req, res) => {
  try {
    const categories = await categoryServices.destroy(req.params);
    res.status(200).json({
      message: "Delete Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategory,
  getOneCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};
