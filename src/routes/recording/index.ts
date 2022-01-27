import { Router } from "express";
import { newRecordingRouter } from "./new-recording";

const BASE_URL = "/recording";

const recordingRouter = Router();

recordingRouter.use(BASE_URL, newRecordingRouter);

export default recordingRouter;
