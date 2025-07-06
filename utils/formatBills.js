export function formatBillMessage(bill) {
  let message = `🧾 *Sai Care Life Sciences - Bill*\n\n👤 *${bill.customerName}*\n📱 ${bill.customerMobile}\n\n`;

  bill.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${item.quantity} × ₹${item.price}\n`;
  });

  message += `\n💰 *Total:* ₹${bill.totalAmount}\n\n🧴 Thank you for shopping with us!`;

  return message;
}
