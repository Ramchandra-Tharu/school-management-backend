const express = require("express");
const { getStudentProfile, getAttendanceHistory } = require("../controllers/student.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.use(isAuthenticatedUser, authorizeRoles("student"));

router.route("/me").get(getStudentProfile);
router.route("/attendance").get(getAttendanceHistory);

module.exports = router;
