const express = require("express");
const router = express.Router();
const { getUserdata, setUserdata, updateUserdata, deleteUserdata } = require("../controllers/userdataController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUserdata).post(protect, setUserdata);

router.route("/:id").put(protect, updateUserdata).delete(protect, deleteUserdata);

module.exports = router;
