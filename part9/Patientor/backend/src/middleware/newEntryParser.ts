import { Request,Response,NextFunction } from "express";
import { NewEntrySchema } from "../utils/utils";

const newEntryParser = (req:Request, _res:Response, next:NextFunction) => {
  try {
    NewEntrySchema(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newEntryParser;