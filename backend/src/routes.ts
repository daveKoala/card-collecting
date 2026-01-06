import express, { Request, Response } from "express";
import UsersRouter from "./domains/users/users.routers";

const router = express.Router();

// Health check endpoint (outside /api/v1)
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// API v1 routes
const apiV1Router = express.Router();

// API info endpoint
apiV1Router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Card Collecting API",
    version: "1.0.0",
  });
});

// Domain routes - add new routes here
apiV1Router.use("/users", UsersRouter);

// Mount API v1 router
router.use("/api/v1", apiV1Router);

export default router;
