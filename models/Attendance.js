const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        required: true,
    },
    classInfo: { // Redundant but helps in querying daily class attendance quickly
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
