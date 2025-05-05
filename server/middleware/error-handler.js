const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `No item found with id : ${err.value}`;
  }

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code && err.code == 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `${Object.keys(
      err.keyValue
    )} already exists, please choose another email`;
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
