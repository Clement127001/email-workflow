const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("Unauthorized user");

  const token = authHeader.split(" ")[1];

  try {
    const { userId, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Unauthorized user");
  }
};

module.exports = authMiddleware;
