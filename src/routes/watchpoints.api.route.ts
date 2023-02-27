import { Router, Request, Response, NextFunction } from "express";
import { WatchpointsController } from "../controllers/watchpoints.controller";
import { Datastore } from "../services/datastore.service";

type Configuration = {
  datastore: Datastore;
};

export function createWatchpointsApiRoute(configuration: Configuration): Router {

  const watchpointsApiRouter = Router();
  const datastore = configuration.datastore;

  watchpointsApiRouter.get("/api/user/:id/watchpoints", async (req: Request, res: Response, next: NextFunction) => {
    const controller = new WatchpointsController(datastore);
    const userId = req.params.id;
    try {
      const result = await controller.getUserWatchpoints(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  watchpointsApiRouter.get("/api/locations", async (req: Request, res: Response, next: NextFunction) => {
    const controller = new WatchpointsController(datastore);
    try {
      const result = await controller.getAllLocations();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  watchpointsApiRouter.get("/api/location/:id", async (req: Request, res: Response, next: NextFunction) => {
    const controller = new WatchpointsController(datastore);
    const locationId = req.params.id;
    try {
      const result = await controller.getLocation(locationId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  watchpointsApiRouter.get("/api/users", async (req: Request, res: Response, next: NextFunction) => {
    const controller = new WatchpointsController(datastore);
    try {
      const result = await controller.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  watchpointsApiRouter.get("/api/user/:id", async (req: Request, res: Response, next: NextFunction) => {
    const controller = new WatchpointsController(datastore);
    const userId = req.params.id;
    try {
      const result = await controller.getUser(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  return watchpointsApiRouter;
} 
