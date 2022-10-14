export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumSignificantDigits: 2,
});

export const formatPercentage = (amount: number): string => {
  return `${amount > 0 ? '+' : ''}${numberFormatter.format(amount)}%`;
};

export const formatCurrency =
  (currency: string) =>
  (amount: number): string =>
    Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
