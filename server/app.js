const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const playsRouter = require("./routes/play");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('tiny'));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to 'A Play Today' api");
});

app.use("/plays", playsRouter);
app.use("/users", userRouter);

module.exports = app;
