import { Router } from "express";
import * as systemStatusController from "@/controllers/SystemStatusController";

const router = Router();

router.get("/", systemStatusController.getSystemStatus);

export default router;

