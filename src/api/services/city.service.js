const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const { StatusCodes } = require("http-status-codes");

const addCity = async (name) => {
    try {
      const city = await prisma.city.create({
        data: {
          name,
        },
      });
      return city;
    } catch (error) {
      throw new CustomAPIError(`[addCity] Failed to add city: ${error.name}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const getCities = async () => {
    try {
        const cities = await prisma.city.findMany();
        return cities;
    } catch(error) {
        throw new CustomAPIError(`[getCities] Failed to get cities: ${error.name}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
  
const getCityById = async (id) => {
    try {
        const city = await prisma.city.findUnique({
        where: {
            id,
        },
        });
        return city;
    } catch(error) {
        throw new CustomAPIError(`[getCityById] Failed to get city with id of ${id}: ${error.name}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const deleteCityById = async (id) => {
    try {
      const city = await prisma.city.delete({
        where: {
          id,
        },
      });
      return city;
    } catch (error) {
        throw new CustomAPIError(`[deleteCityById] Failed to delete city with id of ${id}: ${error.name}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const updateCityById = async (id, newName) => {
    try {
      const city = await prisma.city.update({
        where: {
          id,
        },
        data: {
            name: newName,
        },
      });
      return city;
    } catch (error) {
        throw new CustomAPIError(`[updateCityById] Failed to update city with id of ${id}: ${error.name}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    addCity,
    getCities,
    getCityById,
    deleteCityById,
    updateCityById,
};