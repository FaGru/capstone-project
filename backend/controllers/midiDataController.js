const asyncHandler = require("express-async-handler");

const MidiData = require("../models/midiDataModel");
const User = require("../models/userModel");

// @desc    Get midiData
// @route   GET /api/midiData
// @acces   Private
const getMidiData = asyncHandler(async (req, res) => {
  const midiData = await MidiData.find({ user: req.user.id });

  res.status(200).json(midiData);
});

// @desc    Set midiData
// @route   POST /api/midiData
// @acces   Private
const setMidiData = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const midiData = await MidiData.create({
    text: req.body.text,
    user: req.user.id,
    midiData: req.body.midiData,
  });

  res.status(200).json(midiData);
});

// @desc    Update midiData
// @route   PUT /api/midiData/id
// @acces   Private
const updateMidiData = asyncHandler(async (req, res) => {
  const midiData = await MidiData.findById(req.params.id);

  if (!midiData) {
    res.status(400);
    throw new Error("MidiData not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the midiData user
  if (midiData.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedMidiData = await MidiData.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedMidiData);
});

// @desc    Delete midiData
// @route   DELETE /api/midiData/id
// @acces   Private
const deleteMidiData = asyncHandler(async (req, res) => {
  const midiData = await MidiData.findById(req.params.id);

  if (!midiData) {
    res.status(400);
    throw new Error("MidiData not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the midiData user
  if (midiData.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await midiData.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMidiData,
  setMidiData,
  updateMidiData,
  deleteMidiData,
};
