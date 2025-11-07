/**
 * Admin API Schemas
 * Centralized schema definitions for Admin API documentation
 */

export const adminSchemas = {
  Customer: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      email: {
        type: "string",
        format: "email",
        example: "john.doe@example.com",
      },
      name: { type: "string", example: "John Doe" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  SystemStatus: {
    type: "object",
    properties: {
      client: { type: "object" },
      server: { type: "object" },
      database: { type: "object" },
      system: { type: "object" },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: false },
      error: { type: "string", example: "Error message" },
    },
  },
};

