const express = require("express");
const { addTeacher, addStudent, addClass, getAdminStats } = require("../controllers/admin.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.use(isAuthenticatedUser, authorizeRoles("admin"));

router.route("/teacher/new").post(addTeacher);
router.route("/student/new").post(addStudent);
router.route("/class/new").post(addClass);
router.route("/stats").get(getAdminStats);

module.exports = router;
