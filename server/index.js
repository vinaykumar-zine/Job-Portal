const PORT = 3000; // TODO: change this to env variable
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    
  flags: "a",
});
const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
  flags: "a",
});
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const now = new Date();
  const time = ` ${now.toLocaleTimeString()}`;
  const log = `${req.method} ${req.originalUrl} ${time}`;
  logStream.write(log + "\n");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!").status(200);
});
app.use((err, req, res, next) => {
  const now = new Date();
  const time = ` ${now.toLocaleTimeString()}`;
  const error = `${req.method} ${req.originalUrl} ${time}`;
  errorStream.write(error + err.stack + "\n");
  res.status(500).send("Internal Server Error");
});
app.use((req, res, next) => {
  const now = new Date();
  const time = ` ${now.toLocaleTimeString()}`;
  const error = `${req.method} ${req.originalUrl} ${time}`;
  errorStream.write(error + "\n");
  res.status(404).send("Route not found!");
});

mongoose.connect("mongodb+srv://vinay:zinevinay@cluster0.acowhsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`server is running on ${PORT}`));