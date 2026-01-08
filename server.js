console.log("Starting server.js...");
const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    // If we had a config file, we'd load it here.
    // dotenv.config({ path: "config/config.env" });
}

// Connect to Database
connectDatabase();

const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT || 4000}`);
});

server.on("error", (e) => {
    console.log("Server Error:", e);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
