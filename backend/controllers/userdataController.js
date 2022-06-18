const asyncHandler = require("express-async-handler");
const { globalAgent } = require("http");

const Userdata = require("../model/userdataModel");

// @desc    Get userdata
// @route   GET /api/userdata
// @acces   Private
const getUserdata = asyncHandler(async (req, res) => {
  const userdatas = await Userdata.find({});

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
  await userdata.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUserdata,
  setUserdata,
  updateUserdata,
  deleteUserdata,
};
