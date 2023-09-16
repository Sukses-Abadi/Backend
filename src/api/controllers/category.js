const CustomAPIError = require("../middlewares/custom-error");
const categoryServices = require("../services/category.service");

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryServices.findAll(req.query);
    if (!categories) {
      throw new CustomAPIError(`No Category with id ${req.params.id}`, 400);
    }
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
    if (!categories) {
      throw new CustomAPIError(`No Category with id ${req.params.id}`, 400);
    }
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
    if (!categories) {
      throw new CustomAPIError(`No Category with id ${req.params.id}`, 400);
    }
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
    // const categories = await categoryServices.findOne(req.params);
    // if (!categories) {
    //   throw new CustomAPIError(`No Category with id ${req.params.id}`, 400);
    // }
    const updatedCategories = await categoryServices.update(
      req.params,
      req.body
    );
    res.status(200).json({
      message: "Update Category Succesfully",
      data: updatedCategories,
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
