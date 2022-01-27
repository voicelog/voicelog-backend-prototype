import { Request, Response, Router } from "express";
import { multer } from "../../middleware/multer";
import * as GStoreService from "../../services/google-storage/";

const router = Router();

router.post(
  "/upload",
  multer.single("recording"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    try {
      const recordingFileName = req.file.originalname;

      const recodingUrl = await GStoreService.storeFile(
        recordingFileName,
        req.file
      );

      res.status(200).send({
        message: "Recording saved successfully",
        data: {
          recodingUrl,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to save recording",
        error: error,
      });
    }
  }
);

export { router as newRecordingRouter };
