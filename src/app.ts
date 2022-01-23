import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

export { app };
