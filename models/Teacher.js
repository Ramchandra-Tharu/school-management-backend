const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    subjects: [
        {
            type: String,
        },
    ],
    phone: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);
