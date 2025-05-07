require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");
const allowCrossDomain = require("./middleware/allow-cors");

const workflowRouter = require("./routes/workflow");
const authRouter = require("./routes/auth");
const emailRouter = require("./routes/emailTemplate");

app.use(express.json());
app.use(allowCrossDomain);

app.get("/api/hello", (req, res) => {
  res.send("api is working, hurray!!");
});

app.use("/api/auth", authRouter);
app.use("/api/email", authMiddleware, emailRouter);
app.use("/api/workflow", authMiddleware, workflowRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
