const express = require("express");
const router = express.Router();
const { getUserdata, setUserdata, updateUserdata, deleteUserdata } = require("../controllers/userdataController");

router.route("/").get(getUserdata).post(setUserdata);

router.route("/:id").put(updateUserdata).delete(deleteUserdata);

module.exports = router;
