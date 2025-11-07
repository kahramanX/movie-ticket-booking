import { Router } from "express";
import * as memberController from "@/controllers/admin/memberController";

const router = Router();

/**
 * @swagger
 * /api/v1/admin/members:
 *   get:
 *     summary: Get all members (Admin only)
 *     tags: [Admin - Members]
 *     description: Retrieve a list of all members. Admin access required.
 *     responses:
 *       200:
 *         description: List of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *                 count:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", memberController.getAllMembers);

/**
 * @swagger
 * /api/v1/admin/members/{id}:
 *   get:
 *     summary: Get member by ID (Admin only)
 *     tags: [Admin - Members]
 *     description: Retrieve detailed information about a specific member. Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", memberController.getMemberById);

export default router;
