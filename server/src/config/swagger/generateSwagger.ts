import swaggerAutogen from "swagger-autogen";
import path from "path";
import fs from "fs";
import { docAdmin, docClient, getTagFromPath } from "./swaggerConfig";

const outputFileAdmin = path.join(__dirname, "swagger-output-admin.json");
const outputFileClient = path.join(__dirname, "swagger-output-client.json");

// Admin endpoints - include app.ts to get full route structure
const endpointsFilesAdmin = [path.join(__dirname, "../../app.ts")];

// Client endpoints - include app.ts to get full route structure
const endpointsFilesClient = [path.join(__dirname, "../../app.ts")];

// Post-process JSON to filter paths by basePath and automatically add tags
const postProcessSwagger = (filePath: string, basePath: string) => {
  const swaggerDoc = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Filter paths and automatically assign tags
  const processedPaths: Record<string, any> = {};
  const usedTags = new Set<string>();

  for (const [path, methods] of Object.entries(swaggerDoc.paths || {})) {
    // Remove trailing slashes
    let normalizedPath = path.replace(/\/$/, "") || "/";

    // Only keep paths that start with basePath
    if (normalizedPath.startsWith(basePath)) {
      // Automatically determine tag from path
      const tag = getTagFromPath(normalizedPath, basePath);
      usedTags.add(tag);

      // Add tags to all methods in this path
      const processedMethods: Record<string, any> = {};
      for (const [method, methodData] of Object.entries(
        methods as Record<string, any>,
      )) {
        const methodObj = { ...methodData };
        // Only add tag if not already set (route file might have #swagger.tags)
        if (!methodObj.tags || methodObj.tags.length === 0) {
          methodObj.tags = [tag];
        }
        processedMethods[method] = methodObj;
      }

      processedPaths[normalizedPath] = processedMethods;
    }
  }

  swaggerDoc.paths = processedPaths;

  // Update tags list to only include used tags
  if (swaggerDoc.tags) {
    swaggerDoc.tags = swaggerDoc.tags.filter((tag: any) =>
      usedTags.has(tag.name),
    );
  }

  // Fix schema definitions (swagger-autogen sometimes nests them incorrectly)
  if (swaggerDoc.components?.schemas) {
    const fixedSchemas: Record<string, any> = {};
    const configSchemas = (
      basePath.includes("/admin")
        ? docAdmin.components?.schemas
        : docClient.components?.schemas
    ) as Record<string, any> | undefined;

    for (const [schemaName, schema] of Object.entries(
      swaggerDoc.components.schemas,
    )) {
      // If schema is incorrectly nested, use the config schema instead
      if (
        schema &&
        typeof schema === "object" &&
        "type" in schema &&
        schema.type === "object" &&
        "properties" in schema &&
        schema.properties !== null &&
        typeof schema.properties === "object" &&
        "type" in schema.properties &&
        schema.properties.type === "object"
      ) {
        // Use config schema if available
        if (configSchemas && schemaName in configSchemas) {
          fixedSchemas[schemaName] = configSchemas[schemaName];
        } else {
          fixedSchemas[schemaName] = schema;
        }
      } else {
        fixedSchemas[schemaName] = schema;
      }
    }
    swaggerDoc.components.schemas = fixedSchemas;
  }

  fs.writeFileSync(filePath, JSON.stringify(swaggerDoc, null, 2));
};

const generateSwagger = async () => {
  const swaggerAutogenInstance = swaggerAutogen({ openapi: "3.0.0" });

  try {
    // Generate Admin Swagger
    await swaggerAutogenInstance(
      outputFileAdmin,
      endpointsFilesAdmin,
      docAdmin,
    );
    // Post-process to fix paths and add base path
    postProcessSwagger(outputFileAdmin, "/api/v1/admin");
    console.log("✅ Admin Swagger documentation generated");

    // Generate Client Swagger
    await swaggerAutogenInstance(
      outputFileClient,
      endpointsFilesClient,
      docClient,
    );
    // Post-process to fix paths and add base path
    postProcessSwagger(outputFileClient, "/api/v1/client");
    console.log("✅ Client Swagger documentation generated");
  } catch (error) {
    console.error("❌ Error generating Swagger:", error);
    process.exit(1);
  }
};

generateSwagger();

