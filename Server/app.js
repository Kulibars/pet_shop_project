require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.use("/", routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});

mongoose
  .connect(process.env.DB_CONNECTION_STRING)

  .then(async () => {
    app.listen(port, () => {
      console.log(`Start server on port ${port}`);
    });
  });
