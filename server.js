console.clear();
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const connectDB = require("./config/connectdb");
const cookieParser = require("cookie-parser");

const app = express();

// connect to DB
connectDB();

// parsing json data types
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/patient", require("./routes/patient/patient"));
app.use("/api/atelier", require("./routes/atelier/atelier"));
//app.use("/api/atelier/profile", require("./routes/atelier/cart"));

// server
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on ${PORT}`)
);
