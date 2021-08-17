console.clear();
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const connectDB = require("./config/connectdb");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");


const app = express();

// connect to DB
connectDB();

// parsing json data types
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use("/api/patient", require("./routes/patient/patient"));
app.use("/api/atelier", require("./routes/atelier/atelier"));
app.use("/api/atelier", require("./routes/atelier/profile"));
app.use("/api/atelier", require("./routes/atelier/category"));
app.use("/api/atelier", require("./routes/atelier/upload"));
app.use("/api/atelier", require("./routes/atelier/articles"));
app.use("/api/patient", require("./routes/patient/besoin"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/user", require("./routes/profileuser/profileuser"));
// server
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on ${PORT}`)
);
