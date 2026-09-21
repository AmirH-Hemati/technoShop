import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: Document & { _id: mongoose.Types.ObjectId };
      queryFilter?: Record<string, unknown>;
    }
  }
}

import mongoose from "mongoose";

export {};