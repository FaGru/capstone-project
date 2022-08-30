const express = require("express");
const router = express.Router();
const { getMidiData, setMidiData, updateMidiData, deleteMidiData } = require("../controllers/midiDataController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMidiData).post(protect, setMidiData);

router.route("/:id").put(protect, updateMidiData).delete(protect, deleteMidiData);

module.exports = router;
