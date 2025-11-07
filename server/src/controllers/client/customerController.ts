import { Request, Response } from "express";
import { Customer } from "@/models/Customer";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.json({ success: true, data: customers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch customers" });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch customer" });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to create customer" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Customer.update(req.body, {
      where: { id },
    });
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    const customer = await Customer.findByPk(id);
    res.json({ success: true, data: customer });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to update customer" });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Customer.destroy({ where: { id } });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to delete customer" });
  }
};
