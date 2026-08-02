const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const app = require("./app");

let databaseUri = "";
if (process.env.NODE_ENV === "development") {
  databaseUri = process.env.DATABASE_DEVELOPMENT;
} else if (process.env.NODE_ENV === "production") {
  databaseUri = process.env.DATABASE_PRODUCTION.replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD,
  );
}

mongoose
  .connect(databaseUri)
  .then(() => console.log("✅ MongoDB  Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listen on http://localhost:${port}`);
});
