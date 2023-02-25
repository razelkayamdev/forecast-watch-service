import { Router, Request, Response, NextFunction } from "express";

export function createWatchpointsRoute(): Router {

  const watchpoints = Router();

  watchpoints.get("/api/watchpoints", async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({});
  });


  return watchpoints;
} 