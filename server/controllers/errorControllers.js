const { z } = require("zod");
const AppError = require("../utils/AppError");

function handelDuplicateFieldsDb(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `فیلد انتخاب شده تکراری است ${value} `;

  return new AppError(message, 400);
}

function handelCastErrorDb(err) {
  const message = `نا معتبر هست ${err.path} : ${err.value}`;
  return new AppError(message, 400);
}

function handleJWTError() {
  return new AppError("توکن نامعتبر است , دوباره وارد شوید", 401);
}
function handleJWTExpiredError() {
  return new AppError("توکن منقضی شده است , دوباره وارد شوید", 401);
}
function sendErrorDev(err, req, res) {
  console.log(new Date().toTimeString(), err);

  return res.status(err.statusCode).json({
    success: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function sendErroProd(err, req, res) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    return res.status(400).json({
      status: "fail",
      errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("Error💣");
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong !",
  });
}
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.code === 11000) err = handelDuplicateFieldsDb(err);
    if (err.name === "CastError") err = handelCastErrorDb(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
    sendErroProd(err, req, res);
  }
};
