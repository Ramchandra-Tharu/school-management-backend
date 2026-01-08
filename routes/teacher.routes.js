const express = require("express");
const { markAttendance, getStudentsByClass } = require("../controllers/teacher.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Allow admin to also perform these if needed, but primarily teacher
router.use(isAuthenticatedUser, authorizeRoles("teacher", "admin"));

router.route("/attendance").post(markAttendance);
router.route("/class/:classId/students").get(getStudentsByClass);

module.exports = router;
