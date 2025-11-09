const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/users");
const quoteRouter = require("./routes/quotes");

const errorHandler = require('./utils/errhandler')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Testing
app.get("/", (req, res) => {
  res.send("Hello User!");
});

// Routes
app.use("/users", userRouter);
app.use("/quotes", quoteRouter);

// Error handling middleware must be last
app.use(errorHandler)

app.listen(4000, "0.0.0.0", () => {
  console.log("Server started at port 4000");
});
