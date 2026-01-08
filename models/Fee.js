const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String, // e.g., "Monthly", "Annual", "Exam"
        required: true,
    },
    status: {
        type: String,
        enum: ["Paid", "Pending", "Overdue"],
        default: "Pending",
    },
    dueDate: {
        type: Date,
        required: true,
    },
    paymentDate: {
        type: Date,
    },
});

module.exports = mongoose.model("Fee", feeSchema);
