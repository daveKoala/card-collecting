import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";

export const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(morgan("combined")); // Use 'dev' for development, 'combined' for production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all routes
app.use(router);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});
