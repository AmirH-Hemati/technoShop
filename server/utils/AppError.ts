export class AppError extends Error {
  statusCode: number;
  status: string;
  errorCode: string;

  constructor(message: string, statusCode: number, errorCode = "") {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;