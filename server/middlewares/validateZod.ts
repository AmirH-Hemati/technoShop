import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validateZod = (schema: z.ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
};

export default validateZod;