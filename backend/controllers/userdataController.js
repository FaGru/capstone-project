const asyncHandler = require("express-async-handler");

const Userdata = require("../models/userdataModel");
const User = require("../models/userModel");

// @desc    Get userdata
// @route   GET /api/userdata
// @acces   Private
const getUserdata = asyncHandler(async (req, res) => {
  const userdatas = await Userdata.find({ user: req.user.id });

  res.status(200).json(userdata);
});

// @desc    Set userdata
// @route   POST /api/userdata
// @acces   Private
const setUserdata = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const userdata = await Userdata.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(userdata);
});

// @desc    Update userdata
// @route   PUT /api/userdata/id
// @acces   Private
const updateUserdata = asyncHandler(async (req, res) => {
  const userdata = await Userdata.findById(req.params.id);

  if (!userdata) {
    res.status(400);
    throw new Error("Userdata not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the userdata user
  if (userdata.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedUserdata = await Userdata.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedUserdata);
});

// @desc    Delete userdata
// @route   DELETE /api/userdata/id
// @acces   Private
const deleteUserdata = asyncHandler(async (req, res) => {
  const userdata = await Userdata.findById(req.params.id);

  if (!userdata) {
    res.status(400);
    throw new Error("Userdata not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the userdata user
  if (userdata.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await userdata.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUserdata,
  setUserdata,
  updateUserdata,
  deleteUserdata,
};
