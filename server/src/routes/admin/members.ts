import { Router } from "express";
import * as memberController from "@/controllers/admin/memberController";

const router = Router();

router.get("/", memberController.getAllMembers);

router.get("/:id", memberController.getMemberById);

export default router;

