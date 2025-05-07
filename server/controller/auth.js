const { StatusCodes } = require("http-status-codes");
const user = require("../models/User");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { email } = req.body;

  const foundUser = await user.findOne({ email });

  if (foundUser) throw new BadRequestError("User already exists, try to login");

  const newUser = await user.create(req.body);
  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide the valid credentials");

  const foundUser = await user.findOne({ email });
  if (!foundUser) throw new UnauthenticatedError("User not found");

  const isPasswordMatched = await foundUser.comparePassword(password);
  if (!isPasswordMatched) throw new UnauthenticatedError("Invalid Password");

  const token = foundUser.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: foundUser.name, userId: foundUser._id }, token });
};

module.exports = { register, login };
