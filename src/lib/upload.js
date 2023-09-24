require("dotenv").config();
const uploadFile = (req, res) => {
  const uploadedFiles = req.files.map((file) => ({
    photo: `${file.filename}`,
  }));

  res.json(uploadedFiles);
};

module.exports = uploadFile;
