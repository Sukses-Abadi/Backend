const subCategoryServices = require("../services/subcategoryServices");

const getAllSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.findAll(req.query);
    res.status(200).json({
      message: "Get All Sub Categories",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const getOneSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.findOne(req.params);
    res.status(200).json({
      message: "Get Sub Categories",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const newSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.create(req.body);
    res.status(201).json({
      message: "Create New Sub Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.update(req.params, req.body);

    res.status(200).json({
      message: "Update Sub Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.destroy(req.params);
    res.status(200).json({
      message: "Delete Sub Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSubCategory,
  getOneSubCategory,
  newSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
