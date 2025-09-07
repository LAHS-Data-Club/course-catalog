import * as express from "express";

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

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = req.session.userId;
  if (!userId) res.status(401).send("Unauthorized");
  next();
};
