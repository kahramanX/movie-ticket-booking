import { Router } from "express";
import * as userController from "@/controllers/client/userController";

const router = Router();

/* #swagger.tags = ['Client - User'] */
router.get("/", userController.getCurrentUser);
/* #swagger.tags = ['Client - User'] */
router.get("/membership", userController.getUserMembership);

export default router;
