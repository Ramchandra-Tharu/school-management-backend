const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
        unique: true,
    },
    classInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    parentContact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    dob: {
        type: Date
    }
});

module.exports = mongoose.model("Student", studentSchema);
