import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import allRouter from "./routes";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', allRouter);

export { app };
