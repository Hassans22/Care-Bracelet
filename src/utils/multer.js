import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";

export const fileValidation = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  file: ['application/pdf', 'application/msword'],
  video: ['video/mp4']
}
export const upload = ({ folder, filetype }) => {
  const storage = diskStorage({
    destination: `uploads/${folder}`,
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, nanoid() + "__" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!filetype.includes(file.mimetype)) {
      return cb(new Error("In-valid Format!"), false);
    }
    return cb(null, true);
  };

  const multerUpload = multer({ storage, fileFilter });

  return multerUpload
}