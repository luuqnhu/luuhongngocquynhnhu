export const formatNumber = (
  value: number,
  minimumFractionDigits: number = 4,
  maximumFractionDigits: number = 4
): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};
