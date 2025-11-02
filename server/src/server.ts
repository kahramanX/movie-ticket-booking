import dotenv from "dotenv";
import path from "path";

// Load .env file from root directory (CommonJS has __dirname available)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app";
import sequelize from "./config/database";

const PORT = process.env.PORT || 3000;

// Database connection
async function startServer() {
  try {
    // Try to connect to database
    try {
      await sequelize.authenticate();
      console.log("✅ Database connection established successfully.");

      // Sync database (only in development)
      if (process.env.NODE_ENV === "development") {
        await sequelize.sync({ alter: false });
        console.log("✅ Database synced.");
      }
    } catch (dbError: any) {
      console.warn("⚠️  Database connection failed:", dbError.message);
      console.warn("⚠️  Server will start without database connection.");
      console.warn(
        "⚠️  Make sure PostgreSQL is running and .env file is configured correctly.",
      );
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
