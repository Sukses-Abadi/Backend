const addressServices = require("../services/address.services");

const getAllAddress = async (req, res) => {
  try {
    const address = await addressServices.findAll();
    res.status(200).json({
      message: "Get All Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const getOneAddress = async (req, res) => {
  try {
    const address = await addressServices.findOne(req.params);
    res.status(200).json({
      message: "Get Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const newAddress = async (req, res) => {
  try {
    const address = await addressServices.create(req.body);
    res.status(201).json({
      message: "Create New Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await addressServices.update(+req.user_id, req.body);
    res.status(200).json({
      message: "Update Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await addressServices.destroy(req.params);
    res.status(200).json({
      message: "Delete Address Succesfully",
      data: address,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAddress,
  getOneAddress,
  newAddress,
  updateAddress,
  deleteAddress,
};
