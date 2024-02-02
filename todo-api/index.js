require("dotenv").config({
  path: ".env",
});
const app = require("./src");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
