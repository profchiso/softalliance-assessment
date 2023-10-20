const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multerStorage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const filterFileType = (req, file, cb) => {
  const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  const allowedExtensions = [...allowedImageExtensions];

  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(
      new Error(`Only ${allowedExtensions.join(",")} extensions are allowed`),
      false
    );
  }
};
exports.upload = multer({ storage: multerStorage, fileFilter: filterFileType });
exports.cloudinary = cloudinary;

exports.uploadFile = async (req, field, folder) => {
  let mediaURL = "";

  if (req.file) {
    await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: `${folder}/${field}-${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          console.log(`Error uploading ${field} to cloudinary`);
        } else {
          mediaURL = result.secure_url;
        }
      }
    );
  } else if (req.body[field]) {
    await cloudinary.uploader.upload(
      req.body[field],
      {
        public_id: `${folder}/${field}-${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          console.log(`Error uploading ${field} to cloudinary`);
        } else {
          mediaURL = result.secure_url;
        }
      }
    );
  }

  return mediaURL;
};
