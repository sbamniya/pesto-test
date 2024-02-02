const express = require("express");
const cors = require("cors");

const app = express();

const requiredEnvVariables = ["PORT", "DATABASE_URL", "JWT_SECRET"];

const unsetEnvVariables = requiredEnvVariables.filter(
  (env) => !process.env[env]
);
if (unsetEnvVariables.length > 0) {
  throw new Error(
    `Required ENV variables are not set: ${unsetEnvVariables.join(", ")}`
  );
}

app.use(
  cors({
    origin: ["http://localhost:3001"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/v1", require("./routes"));

module.exports = app