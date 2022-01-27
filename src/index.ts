import dotenv from "dotenv";
import { initGoogleStorage } from "./services/google-storage";
dotenv.config();

const PORT: string | number = process.env.PORT || 4000;

const beforeServer = async () => {
  initGoogleStorage();
}

const startServer = async () => {
  await beforeServer();
  const { app } = await import("./app");

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

startServer();
