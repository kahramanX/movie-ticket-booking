import { Router } from "express";
import * as userController from "@/controllers/client/userController";

const router = Router();

/**
 * @swagger
 * /api/v1/client/user:
 *   get:
 *     summary: Get current user information
 *     tags: [Client - User]
 *     description: Retrieve information about the authenticated user.
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john.doe@example.com"
 *       404:
 *         description: User not found
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
router.get("/", userController.getCurrentUser);

/**
 * @swagger
 * /api/v1/client/user/membership:
 *   get:
 *     summary: Get user membership status
 *     tags: [Client - User]
 *     description: Retrieve membership information for the authenticated user.
 *     responses:
 *       200:
 *         description: Membership information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     membershipType:
 *                       type: string
 *                       example: "standard"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     joinedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: User not found
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
router.get("/membership", userController.getUserMembership);

export default router;

