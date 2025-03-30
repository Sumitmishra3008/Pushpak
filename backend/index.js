const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/user.js");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoutes = require("./routes/user.routes.js");
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = {
  app,
};
