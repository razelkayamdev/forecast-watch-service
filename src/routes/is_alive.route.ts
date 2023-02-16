import { Router, Request, Response, NextFunction } from "express";

export const isAliveRoute = Router();

isAliveRoute.get("/is_alive", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    alive: true
  });
  next();
});