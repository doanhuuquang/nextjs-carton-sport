export default function convertMoney(amount: number): string {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}
