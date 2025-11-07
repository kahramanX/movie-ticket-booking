/**
 * Swagger Configuration
 * Centralized configuration for Swagger documentation generation
 */

import { adminSchemas } from "./schemas/admin";
import { clientSchemas } from "./schemas/client";

// Tag mapping: automatically determine tag from route path
export const getTagFromPath = (path: string, basePath: string): string => {
  const pathWithoutBase = path.replace(basePath, "");
  const segments = pathWithoutBase.split("/").filter(Boolean);

  if (segments.length === 0) return "default";

  const firstSegment = segments[0];

  // Map route segments to tags
  const tagMap: Record<string, string> = {
    members: "Admin - Members",
    "system-status": "System Status",
    user: "Client - User",
    // Add more mappings as needed
    // movies: "Admin - Movies",
    // theaters: "Admin - Theaters",
  };

  return tagMap[firstSegment] || `Admin - ${firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)}`;
};

// Admin API Documentation Config
export const docAdmin = {
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
      url: process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`,
      description: "Development server",
    },
  ],
  components: {
    schemas: adminSchemas,
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
    // Tags will be automatically added based on routes
  ],
};

// Client API Documentation Config
export const docClient = {
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
      url: process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`,
      description: "Development server",
    },
  ],
  components: {
    schemas: clientSchemas,
  },
  tags: [
    {
      name: "Client - User",
      description: "User information and membership endpoints",
    },
    // Tags will be automatically added based on routes
  ],
};

