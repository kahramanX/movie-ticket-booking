import { Request, Response, NextFunction } from "express";
import { Express } from "express";
import allRoutes from "express-list-endpoints";

/**
 * Calculate request duration in milliseconds
 */
const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

/**
 * Request duration middleware for development
 * Logs request method, URL, and response time with color coding
 */
export const requestDurationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    const colorCode =
      durationInMilliseconds >= 1000
        ? "\x1b[31m" // Red for slow (>1s)
        : durationInMilliseconds >= 500
        ? "\x1b[33m" // Yellow for medium (500ms-1s)
        : "\x1b[32m"; // Green for fast (<500ms)

    console.log(
      "\x1b[36m%s\x1b[0m",
      "Responsed :",
      "\x1b[0m\x1b[2m",
      req.method,
      " -> " + req.url,
      colorCode,
      durationInMilliseconds.toLocaleString(),
      "ms",
      "\x1b[0m",
    );
  });

  next();
};

/**
 * Log server startup information with colorful formatting
 */
export const logServerStartup = (app: Express, port: string | undefined) => {
  console.log(
    "\x1b[31m%s",
    "-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|",
    "\x1b[0m",
  );
  console.log(
    "\x1b[34m%s",
    "Using environment :\x1b",
    "\x1b[33m",
    process.env.NODE_ENV || "development",
    "\x1b[0m",
  );
  console.log(
    "\x1b[34m%s",
    "Running On :\x1b",
    "\x1b[33m",
    `http://localhost:${port}`,
    "\x1b[0m",
  );
  console.log(
    "\x1b[34m%s",
    "Route Count : ",
    "\x1b[33m",
    allRoutes(app).length,
    "\x1b[0m",
  );
  console.log(
    "\x1b[34m%s",
    "Admin API Docs : ",
    "\x1b[36m",
    `http://localhost:${port}/api-docs/admin`,
    "\x1b[0m",
  );
  console.log(
    "\x1b[34m%s",
    "Client API Docs : ",
    "\x1b[36m",
    `http://localhost:${port}/api-docs/client`,
    "\x1b[0m",
  );
  console.log(
    "\x1b[31m%s",
    "-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|",
    "\x1b[0m",
  );
  console.log(
    "Server -> Server started at : ",
    "\x1b[33m",
    new Date().toLocaleString(),
    "\x1b[0m",
  );
};

/**
 * Log successful database connection
 */
export const logDatabaseConnection = () => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    "✅ Database connection established successfully.",
  );
};

/**
 * Log successful database sync
 */
export const logDatabaseSync = () => {
  console.log("\x1b[32m%s\x1b[0m", "✅ Database synced.");
};

/**
 * Log database connection error
 */
export const logDatabaseError = (errorMessage: string) => {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "⚠️  Database connection failed:",
    errorMessage,
  );
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "⚠️  Server will start without database connection.",
  );
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "⚠️  Make sure PostgreSQL is running and .env file is configured correctly.",
  );
};

/**
 * Log server startup error
 */
export const logServerError = (error: unknown) => {
  console.error("\x1b[31m%s\x1b[0m", "❌ Unable to start server:", error);
};
