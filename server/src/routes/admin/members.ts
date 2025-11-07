import { Router } from "express";
import * as memberController from "@/controllers/admin/memberController";

const router = Router();

/* #swagger.tags = ['Admin - Members'] */
router.get("/", memberController.getAllMembers);
/* #swagger.tags = ['Admin - Members'] */
router.get("/:id", memberController.getMemberById);

export default router;
