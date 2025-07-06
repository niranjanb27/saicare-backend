import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send a bill summary via SMS using Twilio
 * @param {string} customerMobile - Customer's mobile number (10-digit Indian number)
 * @param {object} bill - Bill object
 */
export const sendSmsBill = async (customerMobile, bill) => {
  const smsTo = `+91${customerMobile}`;
  const smsFrom = process.env.TWILIO_SMS_NUMBER;

  const itemSummary = bill.items
    .map((item) => `${item.name}×${item.quantity} @₹${item.price}`)
    .join(", ");

  const messageBody =
    `Sai Care Bill: ${bill.customerName}\n` +
    `Items: ${itemSummary}\n` +
    `Total: ₹${bill.totalAmount}\n` +
    `Date: ${new Date(bill.createdAt).toLocaleDateString()}\n` +
    `- Sai Care Life Sciences`;

  const message = await client.messages.create({
    body: messageBody,
    from: smsFrom,
    to: smsTo,
  });

  console.log("✅ SMS sent:", message.sid);
};
