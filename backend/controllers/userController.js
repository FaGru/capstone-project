//  @desc   Register new User
//  @route  POST /api/user
//  @acces  Public

const registerUser = (req, res) => {
  res.json({ message: "Register User" });
};

//  @desc   Authenticate User
//  @route  POST /api/user/login
//  @acces  Public

const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

//  @desc   Get user data
//  @route  GET /api/user/me
//  @acces  Public

const getMe = (req, res) => {
  res.json({ message: "User data display" });
};

module.exports = { registerUser, loginUser, getMe };
