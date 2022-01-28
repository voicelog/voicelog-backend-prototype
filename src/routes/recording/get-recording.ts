import { Request, Response, Router } from "express";
import * as GStoreService from "../../services/google-storage";

const router = Router();

router.get("/:recordingName", async (req: Request, res: Response) => {
  const { recordingName } = req.params;

  const recordingStream = await GStoreService.getFileStream(recordingName);
  
  recordingStream.pipe(res);
});

router.get("/:recordingName/url", async (req: Request, res: Response) => {
  const { recordingName } = req.params;

  const recordingUrl = await GStoreService.getFilePublicUrl(recordingName);

  res.status(200).send({
    data: {
      recordingName,
      recordingUrl,
    },
  });
});

export { router as getRecordingRouter };
