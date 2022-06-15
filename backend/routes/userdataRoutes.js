const express = require("express");
const router = express.Router();
const { getUserdatas, setUserdata, updateUserdata, deleteUserdata } = require("../controllers/userdataController");

router.route("/").get(getUserdatas).post(setUserdata);

router.route("/:id").put(updateUserdata).delete(deleteUserdata);

module.exports = router;
