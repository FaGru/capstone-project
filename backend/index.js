const express = require("express");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

connectDB();

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use("/api/userdata", require("./routes/userdataRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
