export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const numberFormatter = new Intl.NumberFormat('en-US');

export const formatCurrency = (currency: string) => (amount: number) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
