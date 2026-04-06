function sendErrorDev(err, req, res) {
  console.log(err);
  return res.status(err.statusCode).json({
    success: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function sendErroProd(err, req, res) {
  console.log(err.message);
  if (err.isOperational) {
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
    sendErroProd(err, req, res);
  }
};
