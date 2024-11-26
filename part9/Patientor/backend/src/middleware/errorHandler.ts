import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json(err.errors.map((e) => ({
      message: e.message,
      path: e.path,
      code: e.code,
    })));
  } else if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Unknown error occurred" });
  }
};

export default errorHandler;
