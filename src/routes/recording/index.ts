import { Router } from "express";
import { getRecordingRouter } from "./get-recording";
import { newRecordingRouter } from "./new-recording";

const BASE_URL = "/recording";

const recordingRouter = Router();

recordingRouter.use(BASE_URL, newRecordingRouter);
recordingRouter.use(BASE_URL, getRecordingRouter);

export default recordingRouter;
