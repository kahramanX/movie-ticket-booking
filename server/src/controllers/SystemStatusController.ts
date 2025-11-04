import { Request, Response } from "express";
import { sequelize } from "@/database/db";
import os from "os";
import { performance } from "perf_hooks";

// Server start time (for uptime calculation)
const serverStartTime = Date.now();

// Calculate CPU usage dynamically
const getCpuUsage = (): number => {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (const type in cpu.times) {
      totalTick += cpu.times[type as keyof typeof cpu.times];
    }
    totalIdle += cpu.times.idle;
  });

  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const usage = 100 - Math.round((100 * idle) / total);

  return Math.max(0, Math.min(100, usage));
};

export const getSystemStatus = async (req: Request, res: Response) => {
  try {
    // Database connection check
    let dbConnected = false;
    let queryPerformance = 0;
    let connectionPool = { active: 0, max: 5 };

    try {
      const start = performance.now();
      await sequelize.authenticate();
      queryPerformance = Math.round(performance.now() - start);
      dbConnected = true;

      // Connection pool info - from Sequelize pool config
      const config = sequelize.config;
      connectionPool = {
        active: (sequelize.connectionManager as any).pool?.size || 0,
        max: config.pool?.max || 5,
      };
    } catch (error) {
      dbConnected = false;
    }

    // Server uptime calculation (dynamic)
    const uptimeMs = Date.now() - serverStartTime;
    const uptimeDays = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const uptimeHours = Math.floor(
      (uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const uptimeMinutes = Math.floor(
      (uptimeMs % (1000 * 60 * 60)) / (1000 * 60),
    );

    let uptime = "";
    if (uptimeDays > 0) {
      uptime = `${uptimeDays} day${
        uptimeHours > 0 ? ` ${uptimeHours} hour` : ""
      }`;
    } else if (uptimeHours > 0) {
      uptime = `${uptimeHours} hour${
        uptimeMinutes > 0 ? ` ${uptimeMinutes} minute` : ""
      }`;
    } else {
      uptime = `${uptimeMinutes} minute`;
    }

    // Memory usage (dynamic)
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = Math.round((usedMemory / totalMemory) * 100);

    // CPU usage (dynamic)
    const cpuUsage = getCpuUsage();

    // API connection status check (dynamic - connected if server is running)
    const apiConnected = true;

    const systemStatus = {
      client: {
        dashboard: {
          name: "Dashboard",
          status: "online",
        },
        apiConnection: {
          name: "API Connection",
          status: apiConnected ? "online" : "offline",
          value: apiConnected ? "Connected" : "Not Connected",
        },
      },
      server: {
        apiStatus: {
          name: "API Status",
          status: "online",
          value: "Running",
        },
        uptime: {
          name: "Uptime",
          value: uptime,
        },
      },
      database: {
        connection: {
          name: "Database Connection",
          status: dbConnected ? "online" : "offline",
          value: dbConnected ? "Connected" : "Not Connected",
        },
        queryPerformance: {
          name: "Query Performance",
          value: `${queryPerformance}ms`,
        },
        connectionPool: {
          name: "Connection Pool",
          value: `${connectionPool.active}/${connectionPool.max}`,
        },
      },
      system: {
        cpuUsage: {
          name: "CPU Usage",
          value: `${cpuUsage}%`,
        },
        memoryUsage: {
          name: "Memory Usage",
          value: `${memoryUsage}%`,
        },
      },
    };

    res.json({
      success: true,
      data: systemStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch system status",
    });
  }
};
