const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + name + "." + extension);
    },
});

// Middleware 1 : upload de l'image
const uploadImage = multer({ storage }).single("image");

// Middleware 2 : compression de l'image avec sharp
const compressImage = (req, res, next) => {
    if (!req.file) return next();

    const outputFilename = Date.now() + "_compressed_" + req.file.filename;
    const outputPath = "images/" + outputFilename;

    sharp(req.file.path)
        .resize(800)
        .jpeg({ quality: 80 })
        .toFile(outputPath, (err) => {
            if (err) return next(err);
            req.file.path = outputPath;
            req.file.filename = outputFilename;
            next();
        });
};

module.exports = { uploadImage, compressImage };
