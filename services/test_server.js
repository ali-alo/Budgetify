const express = require("express");
const app = express();

const adminRouter = require("../routes/admin");
const signInRouter = require("../routes/sign-in");

app.use("/admin", adminRouter);
app.use("/sign-in", signInRouter);

module.exports = app;
