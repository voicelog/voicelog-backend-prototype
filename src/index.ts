import dotenv from "dotenv";
dotenv.config();

const PORT: string | number = process.env.PORT || 4000;

const startServer = async () => {
  const { app } = await import("./app");

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

startServer();
