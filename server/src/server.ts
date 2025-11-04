// Register tsconfig-paths FIRST for path alias resolution
import "tsconfig-paths/register";

// Load .env file FIRST, before any imports that need environment variables
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Now import modules that depend on environment variables
import app from "@/app";
import { sequelize } from "@/database/db";
import {
  logServerStartup,
  logDatabaseConnection,
  logDatabaseSync,
  logDatabaseError,
  logServerError,
} from "@/utils/initialLogger";

const PORT = process.env.PORT;

// Database connection
async function startServer() {
  try {
    // Try to connect to database
    try {
      await sequelize.authenticate();
      logDatabaseConnection();

      // Sync database (only in development)
      if (process.env.NODE_ENV === "development") {
        await sequelize.sync({ alter: false });
        logDatabaseSync();
      }
    } catch (dbError: any) {
      logDatabaseError(dbError.message);
    }

    app.listen(PORT, () => {
      logServerStartup(app, PORT);
    });
  } catch (error) {
    logServerError(error);
    process.exit(1);
  }
}

startServer();
