import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerMobile: { type: String, required: true }, // <-- added
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    notes: String,
  },
  { timestamps: true }
);


export default mongoose.model("Bill", billSchema);
