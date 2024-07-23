import app from "./app";

function startServer() {
  const PORT = process.env.APP_PORT;

  app.listen(PORT, () => {
    console.log(`The application is running on ${PORT}`);
  });
}

startServer();