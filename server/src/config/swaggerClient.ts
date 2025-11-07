import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Ticket Booking - Client API",
      version: "1.0.0",
      description: "Client API documentation for Movie Ticket Booking System",
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
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "User ID",
              example: 1,
            },
            name: {
              type: "string",
              description: "User name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "john.doe@example.com",
            },
          },
        },
        Membership: {
          type: "object",
          properties: {
            userId: {
              type: "integer",
              description: "User ID",
              example: 1,
            },
            membershipType: {
              type: "string",
              description: "Membership type",
              example: "standard",
              enum: ["standard", "premium", "vip"],
            },
            status: {
              type: "string",
              description: "Membership status",
              example: "active",
              enum: ["active", "inactive", "expired"],
            },
            joinedAt: {
              type: "string",
              format: "date-time",
              description: "Membership join date",
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
        name: "Client - User",
        description: "User information and membership endpoints",
      },
    ],
  },
  apis: ["./src/routes/client/*.ts", "./src/controllers/client/*.ts"],
};

export const swaggerClientSpec = swaggerJsdoc(options);
