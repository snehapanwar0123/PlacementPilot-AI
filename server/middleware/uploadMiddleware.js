import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});



const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const isPdf =
    ext === ".pdf" &&
    (file.mimetype === "application/pdf" ||
      file.mimetype === "application/octet-stream");

  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export default multer({
  storage,
  fileFilter,
});