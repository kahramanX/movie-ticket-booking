import { Request, Response } from "express";
import { Customer } from "@/models/Customer";

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await Customer.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: members,
      count: members.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch members",
    });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await Customer.findByPk(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        error: "Member not found",
      });
    }

    res.json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch member",
    });
  }
};
