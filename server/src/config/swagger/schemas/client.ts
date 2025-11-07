/**
 * Client API Schemas
 * Centralized schema definitions for Client API documentation
 */

export const clientSchemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "John Doe" },
      email: {
        type: "string",
        format: "email",
        example: "john.doe@example.com",
      },
    },
  },
  Membership: {
    type: "object",
    properties: {
      userId: { type: "integer", example: 1 },
      membershipType: {
        type: "string",
        enum: ["standard", "premium", "vip"],
        example: "standard",
      },
      status: {
        type: "string",
        enum: ["active", "inactive", "expired"],
        example: "active",
      },
      joinedAt: { type: "string", format: "date-time" },
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

