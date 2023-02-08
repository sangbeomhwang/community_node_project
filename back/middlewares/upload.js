const multer = require("multer");
const path = require("path");

const uploadImage = multer({
  storage: multer.diskStorage({
    // 1. 저장할 경로
    destination: (req, file, done) => {
      done(null, "uploads/");
    },
    // 2. 파일명_시간.확장자
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + Date.now() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = uploadImage;
