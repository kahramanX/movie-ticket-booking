import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerAdminSpec } from "@/config/swaggerAdmin";
import { swaggerClientSpec } from "@/config/swaggerClient";
import { requestDurationMiddleware } from "@/utils/initialLogger";
import adminRoutes from "@/routes/admin/index";
import clientRoutes from "@/routes/client/index";
import { sequelize } from "@/database/db";
import { Customer } from "@/models/Customer";

const app: Express = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "UPDATE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request duration middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use(requestDurationMiddleware);
}

// Swagger API Documentation - Admin
app.use(
  "/api-docs/admin",
  swaggerUi.serveFiles(swaggerAdminSpec, {}),
  swaggerUi.setup(swaggerAdminSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Admin API Documentation",
  }),
);

// Swagger API Documentation - Client
app.use(
  "/api-docs/client",
  swaggerUi.serveFiles(swaggerClientSpec, {}),
  swaggerUi.setup(swaggerClientSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Client API Documentation",
  }),
);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     description: Returns server health status. Available for admin monitoring.
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ success: true, message: "Server is running" });
});

// Database models and sync
try {
  // Sequelize v6 doesn't have addModels, models are registered when imported
  // Importing Customer model registers it automatically

  (async () => {
    try {
      // Only sync in development with alter: false (not force: true for safety)
      if (process.env.NODE_ENV === "development") {
        await sequelize.sync({ alter: false });
        console.log("\x1b[32m%s\x1b[0m", "Database synchronized ✅");
      }
    } catch (error) {
      console.log("\x1b[31m%s\x1b[0m", "⚠⚠⚠ Database NOT synchronized ⚠⚠⚠");
    }
  })();

  // Admin Routes
  app.use("/api/v1/admin/members", cors(corsOptions), adminRoutes.members);
  app.use(
    "/api/v1/admin/system-status",
    cors(corsOptions),
    adminRoutes.systemStatus,
  );

  // Client Routes
  app.use("/api/v1/client/user", cors(corsOptions), clientRoutes.user);

  // 404 handler - must be after all routes
  app.get("*", (req: Request, res: Response) => {
    res
      .status(404)
      .json({
        message: "This route is unavailable",
        path: "Visit project's repo for more details",
      })
      .end();
  });
} catch (error) {
  console.log("\x1b[31m%s\x1b[0m", "APP.TS Code Error", error);
}

// Error handler - must be last
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    },
  });
});

export default app;
