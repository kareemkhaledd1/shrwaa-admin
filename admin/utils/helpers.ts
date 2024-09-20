export const formatCurrency = (value: number) => {
  const numberFormat = new Intl.NumberFormat("en", {
    style: "decimal", // Format as decimal number
    minimumFractionDigits: 2, // Optional: to show two decimal places
    maximumFractionDigits: 2, // Optional: to limit to two decimal places
  }).format(value);

  const currencySymbol = "KWD"; // Currency symbol or code

  return `${numberFormat} ${currencySymbol}`;
};
