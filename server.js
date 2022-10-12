require("dotenv").config();

const { createApp } = require("./app");
const appDataSource = require("./src/models/dataSource");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

	await appDataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();