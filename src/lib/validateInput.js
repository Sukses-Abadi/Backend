const CustomAPIError = require("../api/middlewares/custom-error")
const { StatusCodes } = require("http-status-codes");

const validateString = (input, message) => {
  if (typeof input !== 'string' || !input.trim()) {
    throw new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }
  return input
}

const validateInteger = (input, message) => {
  const intValue = parseInt(input);
  if (isNaN(intValue) || !Number.isInteger(intValue)) {
    throw new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }
  return intValue
}

module.exports = {
  validateString,
  validateInteger,
};