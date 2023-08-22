import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    // error code - 403
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
