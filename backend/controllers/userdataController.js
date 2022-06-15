const asyncHandler = require("express-async-handler");

// @desc    Get userdata
// @route   GET /api/userdata
// @acces   Private
const getUserdatas = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Userdata" });
});

// @desc    Set userdata
// @route   POST /api/userdata
// @acces   Private
const setUserdata = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ message: "Set Userdata" });
});

// @desc    Update userdata
// @route   PUT /api/userdata/id
// @acces   Private
const updateUserdata = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Userdata ${req.params.id}` });
});

// @desc    Delete userdata
// @route   DELETE /api/userdata/id
// @acces   Private
const deleteUserdata = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Userdata ${req.params.id}` });
});

module.exports = {
  getUserdatas,
  setUserdata,
  updateUserdata,
  deleteUserdata,
};
