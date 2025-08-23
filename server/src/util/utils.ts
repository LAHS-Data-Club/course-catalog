import * as express from "express";
import { getCredentials } from "../auth/auth";

export const asyncHandler =
  (
    fn: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => Promise<any>
  ) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


// TODO: this is kinda silly maybe
export const userHandler = (
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<any>
) =>
  asyncHandler(async (req, res, next) => {
    const { refresh_token } = req.cookies;
    const user = await getCredentials(refresh_token);
    if (!user) return res.status(401).send("Unauthorized");

    res.locals.user = user; 
    Promise.resolve(fn(req, res, next)); 
  });
