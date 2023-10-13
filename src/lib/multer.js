const multer = require("multer");
const fs = require("fs");

// const createUploadsFolder = () => {
//   const folderPath = "./uploads"; // Specify the folder path

//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath);
//     // console.log("Uploads folder created successfully.");
//   }
// };
// createUploadsFolder();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

module.exports = upload;
