import { Router } from "express";

// Import admin route modules
import members from "./members";
import systemStatus from "./systemStatus";

const router = Router();

/**
 * Admin Routes Registration
 *
 * To add a new admin route:
 * 1. Create route file: routes/admin/{feature-name}.ts
 * 2. Import it above
 * 3. Register it below with router.use()
 *
 * Example:
 * import movies from "./movies";
 * router.use("/movies", movies);
 */

// Register admin routes
router.use("/members", members);
router.use("/system-status", systemStatus);

export default router;
