import express from "express";
import {
  createBill,
  getBillsByMobile,
  getAllBills,
  deleteBill,
  updateBill,
} from "../Controllers/billcontrollers.js";

const router = express.Router();

// Admin: Get all bills
router.get("/", getAllBills);

// Admin: Create a new bill
router.post("/", createBill);

// 🆕 User: Get bills by customer mobile number
router.get("/:mobile", getBillsByMobile);

// Admin: Delete a bill
router.delete("/:id", deleteBill);

// Admin: Update a bill
router.put("/:id", updateBill);

export default router;
