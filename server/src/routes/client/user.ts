import { Router } from "express";
import * as userController from "@/controllers/client/userController";

const router = Router();

router.get("/", userController.getCurrentUser);
router.get("/membership", userController.getUserMembership);

export default router;
