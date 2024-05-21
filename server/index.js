const express = require('express');
const bodyParser = require('body-parser');
const { now } = require('mongoose');
const fs = require('fs');
const path = require('path');
const { time, error } = require('console');
const authRoutes = require("./routes/auth");
const jobRoutes = require('./routes/job');


const app = express();
const PORT = 3000;

const logStram = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a"
});
const errorStram = fs.createWriteStream(path.join(__dirname, "error.txt"), {
    flags: "a"
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    const now = new Date();
    // const time = `${now.toLocalTimeString()}`;
    const log = `${req.method} ${req.originalUrl} ${now}`
    logStram.write(log + "\n");
    // console.log(req.originalUrl, now);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello its vinay");
});
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);



app.use((req, res, next) => {
    const now = new Date();
    // const time = `${now.toLocalTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${now}`
    errorStram.write(error + "\n");
    res.status(404).send("Route not found"); 
});
app.listen(PORT, () => console.log(`server is running on ${PORT}`));