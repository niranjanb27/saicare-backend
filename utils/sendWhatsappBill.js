import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send a bill summary via WhatsApp using Twilio
 * @param {string} customerMobile - Customer's mobile number (10-digit Indian number)
 * @param {object} bill - Bill object (includes customerName, items, totalAmount)
 */
export const sendWhatsappBill = async (customerMobile, bill) => {
  try {
    const whatsappTo = `whatsapp:+91${customerMobile}`;
    const whatsappFrom = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`; // e.g., whatsapp:+14155238886

    const itemSummary = bill.items
      .map((item) => `- ${item.name} × ${item.quantity} @ ₹${item.price}`)
      .join("\n");

    const messageBody = `🧾 *Sai Care Life Sciences - Bill Summary*\n\n` +
      `👤 *Name:* ${bill.customerName}\n` +
      `📦 *Medicines:*\n${itemSummary}\n\n` +
      `💰 *Total:* ₹${bill.totalAmount}\n` +
      `🗓️ *Date:* ${new Date(bill.createdAt).toLocaleDateString()}\n\n` +
      `🙏 Thank you for choosing Sai Care!`;

    const message = await client.messages.create({
      body: messageBody,
      from: whatsappFrom,
      to: whatsappTo,
    });

    console.log("✅ WhatsApp bill sent:", message.sid);
  } catch (error) {
    console.error("❌ Failed to send WhatsApp bill:", error.message);
  }
};
