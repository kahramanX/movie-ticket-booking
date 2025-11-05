import { Router } from "express";
import * as systemStatusController from "@/controllers/SystemStatusController";

const router = Router();

/**
 * @swagger
 * /api/v1/admin/system-status:
 *   get:
 *     summary: Get system status information
 *     tags: [System Status]
 *     description: Returns detailed system status including client, server, database, and system metrics
 *     responses:
 *       200:
 *         description: System status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SystemStatus'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", systemStatusController.getSystemStatus);

export default router;

