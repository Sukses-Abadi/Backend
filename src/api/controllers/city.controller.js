const {
    addCity,
    getCities,
    getCityById,
    deleteCityById,
    updateCityById,
  } = require("../services/city.service");
const CustomAPIError = require("../middlewares/custom-error");
const { StatusCodes } = require("http-status-codes");
const {validateInteger, validateString} = require("../../lib/validateInput")


const addNewCity = async (req, res) => {
    try {
        const { name } = req.body;
        const newName = validateString(name, '[addNewCity] Name must be a valid non-empty string');

        const newCity = await addCity(newName);
        res.status(StatusCodes.CREATED).json({data: newCity});
    } catch(error){
        res.status(error.statusCode).json({ error: error.message})
    }
};

const fetchCities = async (req, res) => {
    try {
        const cities = await getCities();
        res.status(StatusCodes.OK).json({data: cities});
    } catch (error){
        res.status(error.statusCode).json({ error: error.message})
    }
};


const fetchCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const cityId = validateInteger(id, '[fetchCityById] ID must be a valid integer');

        const city = await getCityById(cityId);

        if (!city) {
            throw new CustomAPIError(`[fetchCityById] City with id of ${cityId} not found`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({data: city});
    } catch(error){
        res.status(error.statusCode).json({ error: error.message})
    }
};

const removeCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const cityId = validateInteger(id, '[removeCityById] ID must be a valid integer');

        const isExist = await getCityById(cityId);

        if (!isExist) {
            throw new CustomAPIError(`[removeCityById] City with id of ${cityId} not found`, StatusCodes.NOT_FOUND);
        }

        await deleteCityById(cityId);
        res.status(StatusCodes.OK).json({ message: 'City deleted successfully' });
    } catch(error){
        res.status(error.statusCode).json({ error: error.message})
    }
};

const editCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const cityId = validateInteger(id, '[editCityById] ID must be a valid integer');
        const newName = validateString(name, '[editCityById] Name must be a valid non-empty string');

        const isExist = await getCityById(cityId);

        if (!isExist) {
            throw new CustomAPIError(`[editCityById] City with id of ${cityId} not found`, StatusCodes.NOT_FOUND);
        }

        await updateCityById(cityId, newName);
        res.status(StatusCodes.OK).json({ message: 'City edited successfully' });
    } catch(error){
        res.status(error.statusCode).json({ error: error.message})
    }
};

module.exports = {
    addNewCity,
    fetchCities,
    fetchCityById,
    removeCityById,
    editCityById,
};
  