const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const eventsRouter = require("./routes/event");
const classesRouter = require("./routes/class");
const JobRouter = require("./routes/jobRouter");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('tiny'));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to 'Florinate' api");
});

app.use("/events", eventsRouter);
app.use("/classes", classesRouter);
app.use("/jobs", JobRouter);
app.use("/users", userRouter);

module.exports = app;
