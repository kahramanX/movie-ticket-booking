import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Ticket Booking - Admin API",
      version: "1.0.0",
      description: "Admin API documentation for Movie Ticket Booking System",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Customer: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Customer ID",
              example: 1,
            },
            email: {
              type: "string",
              format: "email",
              description: "Customer email address",
              example: "john.doe@example.com",
            },
            name: {
              type: "string",
              description: "Customer name",
              example: "John Doe",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        SystemStatus: {
          type: "object",
          properties: {
            client: {
              type: "object",
              properties: {
                dashboard: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Dashboard" },
                    status: { type: "string", example: "online" },
                  },
                },
                apiConnection: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "API Connection" },
                    status: { type: "string", example: "online" },
                    value: { type: "string", example: "Connected" },
                  },
                },
              },
            },
            server: {
              type: "object",
              properties: {
                apiStatus: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "API Status" },
                    status: { type: "string", example: "online" },
                    value: { type: "string", example: "Running" },
                  },
                },
                uptime: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Uptime" },
                    value: { type: "string", example: "2 day 5 hour" },
                  },
                },
              },
            },
            database: {
              type: "object",
              properties: {
                connection: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Database Connection" },
                    status: { type: "string", example: "online" },
                    value: { type: "string", example: "Connected" },
                  },
                },
                queryPerformance: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Query Performance" },
                    value: { type: "string", example: "45ms" },
                  },
                },
                connectionPool: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Connection Pool" },
                    value: { type: "string", example: "15/20" },
                  },
                },
              },
            },
            system: {
              type: "object",
              properties: {
                cpuUsage: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "CPU Usage" },
                    value: { type: "string", example: "32%" },
                  },
                },
                memoryUsage: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Memory Usage" },
                    value: { type: "string", example: "58%" },
                  },
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              example: "Error message",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Admin - Members",
        description: "Member management endpoints (Admin only)",
      },
      {
        name: "System Status",
        description: "System status and health monitoring endpoints",
      },
    ],
  },
  apis: [
    "./src/routes/admin/*.ts",
    "./src/controllers/admin/*.ts",
  ],
};

export const swaggerAdminSpec = swaggerJsdoc(options);
