import { Router } from "express";

// Import client route modules
import user from "./user";

const router = Router();

/**
 * Client Routes Registration
 *
 * To add a new client route:
 * 1. Create route file: routes/client/{feature-name}.ts
 * 2. Import it above
 * 3. Register it below with router.use()
 *
 * Example:
 * import movies from "./movies";
 * router.use("/movies", movies);
 */

// Register client routes
router.use("/user", user);

export default router;
