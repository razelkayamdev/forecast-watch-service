import { Router, Request, Response, NextFunction } from "express";

type Configutarion = {
  commitHash: string;
};

export function createIsAliveRoute(configutarion: Configutarion): Router {

  const isAliveRoute = Router();

  isAliveRoute.get("/is_alive", async (req: Request, res: Response, _: NextFunction) => {
    res.status(200).json({
      alive: true,
      commitHash: configutarion.commitHash
    });
  });

  return isAliveRoute;
} 