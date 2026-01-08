const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");

// Create Teacher
exports.addTeacher = async (req, res) => {
    try {
        const { name, email, password, qualification, subjects, phone, joiningDate } = req.body;

        // Create User first
        const user = await User.create({
            name,
            email,
            password,
            role: "teacher"
        });

        // Create Teacher Profile
        const teacher = await Teacher.create({
            user: user._id,
            qualification,
            subjects,
            phone,
            joiningDate
        });

        res.status(201).json({
            success: true,
            teacher
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create Student
exports.addStudent = async (req, res) => {
    try {
        const { name, email, password, rollNo, classId, section, parentContact, gender, dob, address } = req.body;

        // Find class
        let classObj = await Class.findOne({ _id: classId });
        if (!classObj) {
            // Create if not exists for simplicity or return error
            // For now return error
            // return res.status(404).json({ message: "Class not found" });
            // Actually let's just use Class details if ID not provided? No, ID is better.
        }

        const user = await User.create({
            name,
            email,
            password,
            role: "student"
        });

        const student = await Student.create({
            user: user._id,
            rollNo,
            classInfo: classId,
            parentContact,
            gender,
            dob,
            address
        });

        res.status(201).json({
            success: true,
            student
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Create Class
exports.addClass = async (req, res) => {
    try {
        const { name, section, teacherId } = req.body;

        const newClass = await Class.create({
            name,
            section,
            teacher: teacherId
        });

        res.status(201).json({ success: true, class: newClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// Get Dashboard Stats
exports.getAdminStats = async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();
        const teacherCount = await Teacher.countDocuments();
        const classCount = await Class.countDocuments();

        res.status(200).json({
            success: true,
            stats: {
                students: studentCount,
                teachers: teacherCount,
                classes: classCount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
