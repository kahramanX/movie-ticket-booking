import { Request, Response } from "express";
import { Customer } from "@/models/Customer";

/**
 * Get current user information (client)
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // TODO: Get user ID from authentication token/session
    // For now, using a sample user ID
    const userIdHeader = req.headers["user-id"];
    const userId =
      typeof userIdHeader === "string"
        ? userIdHeader
        : Array.isArray(userIdHeader) && userIdHeader.length > 0
        ? userIdHeader[0]
        : "1";

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Return only public user information
    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user information",
    });
  }
};

/**
 * Get user membership status (client)
 */
export const getUserMembership = async (req: Request, res: Response) => {
  try {
    // TODO: Get user ID from authentication token/session
    // Kullanıcı ID'sini header'dan güvenli şekilde al
    const userIdHeader = req.headers["user-id"];
    const userId =
      typeof userIdHeader === "string"
        ? userIdHeader
        : Array.isArray(userIdHeader) && userIdHeader.length > 0
        ? userIdHeader[0]
        : "1";

    const user = await Customer.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // TODO: Implement actual membership logic
    // For now, returning mock membership data
    res.json({
      success: true,
      data: {
        userId: user.id,
        membershipType: "standard",
        status: "active",
        joinedAt: user.createdAt,
        // Add more membership details as needed
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch membership information",
    });
  }
};
