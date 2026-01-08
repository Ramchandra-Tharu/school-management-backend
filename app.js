const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const auth = require("./routes/auth.routes");
const admin = require("./routes/admin.routes");
const teacher = require("./routes/teacher.routes");
const student = require("./routes/student.routes");

app.use("/api/v1/auth", auth);
app.use("/api/v1/admin", admin);
app.use("/api/v1/teacher", teacher);
app.use("/api/v1/student", student);

// Simple root route
app.get("/", (req, res) => {
    res.send("School Management System API is running");
});

module.exports = app;
