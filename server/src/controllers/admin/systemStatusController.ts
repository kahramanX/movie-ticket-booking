import { Request, Response } from "express";
import { sequelize } from "@/database/db";
import { QueryTypes } from "sequelize";
import os from "os";
import { performance } from "perf_hooks";
import process from "process";
import si from "systeminformation";

// Server start time (for uptime calculation)
const serverStartTime = Date.now();

// Get disk usage using systeminformation
const getDiskUsage = async () => {
  try {
    const fsSize = await si.fsSize();
    // Get root partition (usually first one or the one with most space)
    const rootPartition = fsSize.find((fs) => fs.mount === "/") || fsSize[0];

    if (!rootPartition) {
      return {
        available: false,
        message: "No disk information available",
      };
    }

    const totalGB = rootPartition.size / (1024 * 1024 * 1024);
    const usedGB = rootPartition.used / (1024 * 1024 * 1024);
    const freeGB = rootPartition.available / (1024 * 1024 * 1024);
    const usagePercent = Math.round(
      (rootPartition.used / rootPartition.size) * 100,
    );

    return {
      available: true,
      total: `${totalGB.toFixed(2)} GB`,
      used: `${usedGB.toFixed(2)} GB`,
      free: `${freeGB.toFixed(2)} GB`,
      usagePercent,
      mount: rootPartition.mount,
      type: rootPartition.type,
    };
  } catch (error) {
    return {
      available: false,
      message: "Disk usage not available",
    };
  }
};

// Get network information using systeminformation
const getNetworkInfo = async () => {
  try {
    // Get network interfaces
    const networkInterfaces = await si.networkInterfaces();
    const activeInterfaces = networkInterfaces.filter(
      (iface) => !iface.internal && iface.ip4,
    );

    // Get network statistics (bytes sent/received)
    const networkStats = await si.networkStats();
    const totalStats = networkStats.reduce(
      (acc, stat) => {
        return {
          bytesReceived: acc.bytesReceived + (stat.rx_bytes || 0),
          bytesSent: acc.bytesSent + (stat.tx_bytes || 0),
        };
      },
      {
        bytesReceived: 0,
        bytesSent: 0,
      },
    );

    // Format bytes to human readable
    const formatBytes = (bytes: number) => {
      if (bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
    };

    return {
      activeInterfaces: activeInterfaces.map((iface) => ({
        name: iface.iface,
        ip4: iface.ip4,
        ip6: iface.ip6,
        mac: iface.mac,
        speed: iface.speed ? `${iface.speed} Mbps` : "Unknown",
      })),
      totalInterfaces: networkInterfaces.length,
      statistics: {
        bytesReceived: formatBytes(totalStats.bytesReceived),
        bytesSent: formatBytes(totalStats.bytesSent),
        raw: {
          bytesReceived: totalStats.bytesReceived,
          bytesSent: totalStats.bytesSent,
        },
      },
    };
  } catch (error) {
    // Fallback to basic info if systeminformation fails
    const interfaces = os.networkInterfaces();
    const activeInterfaces: string[] = [];

    Object.keys(interfaces || {}).forEach((name) => {
      const nets = interfaces[name];
      nets?.forEach((net) => {
        if (net.family === "IPv4" && !net.internal) {
          activeInterfaces.push(name);
        }
      });
    });

    return {
      activeInterfaces: activeInterfaces.map((name) => ({ name })),
      totalInterfaces: Object.keys(interfaces || {}).length,
      statistics: {
        bytesReceived: "N/A",
        bytesSent: "N/A",
      },
    };
  }
};

// Get system load and CPU info using systeminformation
const getSystemLoad = async () => {
  try {
    const currentLoad = await si.currentLoad();
    const loadAvg = os.loadavg(); // Load average is better from os module
    return {
      cpuUsage: Math.round(currentLoad.currentLoad),
      loadAverage: {
        "1min": loadAvg[0].toFixed(2),
        "5min": loadAvg[1].toFixed(2),
        "15min": loadAvg[2].toFixed(2),
      },
    };
  } catch (error) {
    // Fallback to os module
    const loadAvg = os.loadavg();
    return {
      cpuUsage: 0,
      loadAverage: {
        "1min": loadAvg[0].toFixed(2),
        "5min": loadAvg[1].toFixed(2),
        "15min": loadAvg[2].toFixed(2),
      },
    };
  }
};

// Get process information using systeminformation
const getProcessInfo = async () => {
  try {
    const processLoad = await si.processLoad(process.pid.toString());
    const memoryUsage = process.memoryUsage();

    // processLoad returns an array, get first element
    const processData = Array.isArray(processLoad)
      ? processLoad[0]
      : processLoad;
    const cpuPercent = processData?.cpu || 0;

    return {
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024), // MB
      },
      cpu: {
        percent: Math.round(cpuPercent),
        user: 0,
        system: 0,
      },
      pid: process.pid,
      uptime: Math.round(process.uptime()), // seconds
    };
  } catch (error) {
    // Fallback to process module
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    return {
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024), // MB
      },
      cpu: {
        percent: 0,
        user: cpuUsage.user / 1000000, // Convert to seconds
        system: cpuUsage.system / 1000000, // Convert to seconds
      },
      pid: process.pid,
      uptime: Math.round(process.uptime()), // seconds
    };
  }
};

// Get memory info using systeminformation
const getMemoryInfo = async () => {
  try {
    const mem = await si.mem();
    const totalGB = mem.total / (1024 * 1024 * 1024);
    const usedGB = mem.used / (1024 * 1024 * 1024);
    const freeGB = mem.free / (1024 * 1024 * 1024);
    const usagePercent = Math.round((mem.used / mem.total) * 100);

    return {
      total: `${totalGB.toFixed(2)} GB`,
      used: `${usedGB.toFixed(2)} GB`,
      free: `${freeGB.toFixed(2)} GB`,
      usagePercent,
      raw: {
        total: mem.total,
        used: mem.used,
        free: mem.free,
      },
    };
  } catch (error) {
    // Fallback to os module
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const totalGB = totalMemory / (1024 * 1024 * 1024);
    const usedGB = usedMemory / (1024 * 1024 * 1024);
    const freeGB = freeMemory / (1024 * 1024 * 1024);
    const usagePercent = Math.round((usedMemory / totalMemory) * 100);

    return {
      total: `${totalGB.toFixed(2)} GB`,
      used: `${usedGB.toFixed(2)} GB`,
      free: `${freeGB.toFixed(2)} GB`,
      usagePercent,
      raw: {
        total: totalMemory,
        used: usedMemory,
        free: freeMemory,
      },
    };
  }
};

// Get database details
const getDatabaseDetails = async () => {
  try {
    // Get database size
    const dbSizeResult = (await sequelize.query(
      `SELECT pg_size_pretty(pg_database_size(current_database())) as size;`,
      { type: QueryTypes.SELECT },
    )) as Array<{ size: string }>;
    const dbSize = dbSizeResult[0]?.size || "Unknown";

    // Get active connections count
    const activeConnectionsResult = (await sequelize.query(
      `SELECT count(*) as count FROM pg_stat_activity WHERE datname = current_database();`,
      { type: QueryTypes.SELECT },
    )) as Array<{ count: string }>;
    const activeConnections = parseInt(
      activeConnectionsResult[0]?.count || "0",
    );

    // Get table count
    const tableCountResult = (await sequelize.query(
      `SELECT count(*) as count FROM information_schema.tables WHERE table_schema = 'public';`,
      { type: QueryTypes.SELECT },
    )) as Array<{ count: string }>;
    const tableCount = parseInt(tableCountResult[0]?.count || "0");

    return {
      size: dbSize,
      activeConnections,
      tableCount,
    };
  } catch (error) {
    return {
      size: "Unknown",
      activeConnections: 0,
      tableCount: 0,
    };
  }
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

    // Get new information using systeminformation
    const [
      diskUsage,
      networkInfo,
      processInfo,
      systemLoad,
      memoryInfo,
      dbDetails,
    ] = await Promise.all([
      getDiskUsage(),
      getNetworkInfo(),
      getProcessInfo(),
      getSystemLoad(),
      getMemoryInfo(),
      dbConnected
        ? getDatabaseDetails()
        : Promise.resolve({
            size: "Unknown",
            activeConnections: 0,
            tableCount: 0,
          }),
    ]);

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
        loadAverage: {
          name: "Load Average",
          value: `${systemLoad.loadAverage["1min"]} / ${systemLoad.loadAverage["5min"]} / ${systemLoad.loadAverage["15min"]}`,
          details: systemLoad.loadAverage,
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
        size: {
          name: "Database Size",
          value: dbDetails.size,
        },
        activeConnections: {
          name: "Active Connections",
          value: dbDetails.activeConnections.toString(),
        },
        tableCount: {
          name: "Table Count",
          value: dbDetails.tableCount.toString(),
        },
      },
      system: {
        cpuUsage: {
          name: "CPU Usage",
          value: `${systemLoad.cpuUsage}%`,
        },
        memoryUsage: {
          name: "Memory Usage",
          value: `${memoryInfo.usagePercent}%`,
          details: {
            total: memoryInfo.total,
            used: memoryInfo.used,
            free: memoryInfo.free,
          },
        },
        diskUsage: {
          name: "Disk Usage",
          status: diskUsage.available ? "online" : "offline",
          value: diskUsage.available
            ? `${diskUsage.usagePercent}% (${diskUsage.used} / ${diskUsage.total})`
            : diskUsage.message || "Not Available",
          details: diskUsage.available
            ? {
                total: diskUsage.total,
                used: diskUsage.used,
                free: diskUsage.free,
                usagePercent: `${diskUsage.usagePercent}%`,
                mount: diskUsage.mount,
                type: diskUsage.type,
              }
            : undefined,
        },
        network: {
          name: "Network Interfaces",
          value: `${networkInfo.activeInterfaces.length} active`,
          details: {
            activeInterfaces: networkInfo.activeInterfaces,
            totalInterfaces: networkInfo.totalInterfaces,
            statistics: networkInfo.statistics,
          },
        },
        process: {
          name: "Process Information",
          value: `PID: ${processInfo.pid}`,
          details: {
            pid: processInfo.pid,
            uptime: `${processInfo.uptime}s`,
            memory: {
              rss: `${processInfo.memory.rss} MB`,
              heapTotal: `${processInfo.memory.heapTotal} MB`,
              heapUsed: `${processInfo.memory.heapUsed} MB`,
              external: `${processInfo.memory.external} MB`,
            },
            cpu: {
              percent: `${processInfo.cpu.percent}%`,
              user:
                processInfo.cpu.user > 0
                  ? `${processInfo.cpu.user.toFixed(2)}s`
                  : undefined,
              system:
                processInfo.cpu.system > 0
                  ? `${processInfo.cpu.system.toFixed(2)}s`
                  : undefined,
            },
          },
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
