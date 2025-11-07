import { Router } from "express";
import * as systemStatusController from "@/controllers/admin/systemStatusController";

const router = Router();

/* #swagger.tags = ['System Status'] */
router.get("/", systemStatusController.getSystemStatus);

export default router;
