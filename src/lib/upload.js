const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const firebase = require("../../config/firebase");

const storage = getStorage(firebase); // create a reference to storage
// console.log(storage);
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug
const uploadFile = async (req, res) => {
  try {
    const files = req.files;
    const uploadedFiles = [];
    // console.log(files);
    for (const file of files) {
      const timestamp = Date.now();
      const name = file.originalname.split(".")[0];
      const type = file.originalname.split(".")[1];
      const fileName = `${name}_${timestamp}.${type}`;
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, file.buffer);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedFiles.push({ photo: downloadURL });
    }

    res.json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading files" });
  }
};
module.exports = uploadFile;
