export function calculateCostPerMinuteHumanResource(
  priceMonth: number,
): number {
  const costPerMinute = priceMonth / 9000; 
  return costPerMinute;
}
export function calculateUnitCostHumanResource(
  costPerMinute: number,
  timeMinutes: number,
  quantity: number,
): number {
  const unitCost = costPerMinute * timeMinutes * quantity;
  return unitCost;
}