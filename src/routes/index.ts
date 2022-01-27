import { Router } from "express";
import recordingRouter from "./recording";

const allRouter = Router();

allRouter.use(recordingRouter);

export default allRouter;
