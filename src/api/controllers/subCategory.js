const CustomAPIError = require("../middlewares/custom-error");
const subCategoryServices = require("../services/subcategory.service");

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
    if (!categories) {
      throw new CustomAPIError(`No sub category with id ${req.params.id}`, 400);
    }
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
  if (!req.body) {
    throw new CustomAPIError(`please provide all the required parameters`, 400);
  }
  try {
    const categories = await subCategoryServices.update(req.params, req.body);
    if (!categories) {
      throw new CustomAPIError(`No sub category with id ${req.params.id}`, 400);
    }
    res.status(200).json({
      message: "Update Sub Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const deleteSubCategory = async (req, res) => {
  const categories = await subCategoryServices.destroy(req.params);
  if (!categories) {
    throw new CustomAPIError(`No sub category with id ${req.params.id}`, 400);
  }
  res.status(200).json({
    message: "Delete Sub Category Succesfully",
    data: categories,
  });
};

module.exports = {
  getAllSubCategory,
  getOneSubCategory,
  newSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
