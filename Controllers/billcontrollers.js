import Bill from "../Models/bills.js";
import { sendSmsBill } from "../utils/sendSmsBill.js"; // updated

// Create Bill
export const createBill = async (req, res) => {
  try {
    const { sendSms, ...billData } = req.body;

    const bill = new Bill(billData);
    const savedBill = await bill.save();

    // Send SMS if requested
    if (sendSms) {
      try {
        await sendSmsBill(savedBill.customerMobile, savedBill);
        console.log("📲 SMS bill sent successfully.");
      } catch (err) {
        console.error("❌ Failed to send SMS:", err.message);
      }
    }

    res.status(201).json(savedBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get bills by customer mobile (user side)
export const getBillsByMobile = async (req, res) => {
  try {
    const mobile = req.params.mobile;
    const bills = await Bill.find({ customerMobile: mobile });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all bills (admin)
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all bills" });
  }
};

// ✅ Delete a bill
export const deleteBill = async (req, res) => {
  try {
    const deleted = await Bill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Bill not found" });
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a bill
export const updateBill = async (req, res) => {
  try {
    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Bill not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
