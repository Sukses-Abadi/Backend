const CustomAPIError = require("../../middlewares/custom-error");
const subCategoryServices = require("../../services/subcategory.service");

const getAllSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.findAll(req.query);

    if (categories.length === 0) {
      throw new CustomAPIError(`No sub category was found`, 400);
    }

    res.status(200).json({
      status: "success",
      message: "Get All Sub Categories",
      data: categories,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const getOneSubCategory = async (req, res) => {
  try {
    const categories = await subCategoryServices.findOne(req.params);
    if (!categories) {
      throw new CustomAPIError(`No sub category with id ${req.params.id}`, 400);
    }
    res.status(200).json({
      status: "success",
      message: "Get Sub Category",
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
      status: "success",
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
      status: "success",
      message: "Update Sub Category Succesfully",
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

const deleteSubCategory = async (req, res) => {
  const categories = await subCategoryServices.destroy(req.params);

  res.status(200).json({
    status: "success",
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
