export function calculateTotalPrice(
  basePrice: number,
  discount: number,
  taxPercentage: number
): number {
  const discountedPrice = basePrice - discount;
  const taxAmount = (discountedPrice * taxPercentage) / 100;
  const total = Number(discountedPrice) + Number(taxAmount);
  return total;
}
