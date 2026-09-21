import { z } from "zod";
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from "express";

function handelDuplicateFieldsDb(err: { errmsg: string }): AppError {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)?.[0] || "";

  const message = `فیلد انتخاب شده تکراری است ${value}`;

  return new AppError(message, 400);
}

function handelCastErrorDb(err: { path: string; value: unknown }): AppError {
  const message = `نا معتبر هست ${err.path} : ${err.value}`;
  return new AppError(message, 400);
}

function handleJWTError(): AppError {
  return new AppError("توکن نامعتبر است , دوباره وارد شوید", 401);
}

function handleJWTExpiredError(): AppError {
  return new AppError("توکن منقضی شده است , دوباره وارد شوید", 401);
}

function sendErrorDev(
  err: Error & { statusCode: number; status: string; errorCode: string; stack?: string },
  _req: Request,
  res: Response
) {
  return res.status(err.statusCode).json({
    success: err.status,
    errorCode: err.errorCode,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function sendErroProd(
  err: Error & { statusCode: number; status: string; errorCode: string; name?: string; code?: number },
  _req: Request,
  res: Response
) {
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
      errorCode: err.errorCode,
      message: err.message,
    });
  }

  console.error("Error💣");
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong !",
  });
}

export const errorController = (
  err: Error & { statusCode?: number; status?: string; errorCode?: string; name?: string; code?: number },
  req: Request,
  res: Response,
  _next: NextFunction
) => {
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

export default errorController;