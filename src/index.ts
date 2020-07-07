require('dotenv').config()
import "reflect-metadata";
import { connect } from "./config/typeorm";
import { startServer } from "./app";

async function main() {
  connect();
  const app = await startServer();
  app.listen(process.env.PORT);
  console.log(`Server on port ${process.env.PORT}`);
}

main();