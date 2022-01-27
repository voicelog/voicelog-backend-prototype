import Multer from "multer";

const maxSizeinMB = parseInt(process.env.MAX_FILE_SIZE_MB ?? "") || 10;

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: maxSizeinMB * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

export {
  multer
};
