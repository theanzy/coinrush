export const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumSignificantDigits: 2,
});

export const formatPercentage = (amount: number): string => {
  return `${amount > 0 ? '+' : ''}${numberFormatter.format(amount)}%`;
};

export const formatCurrency =
  (currency: string, notation: 'compact' | 'standard') =>
  (amount: number): string =>
    Intl.NumberFormat('en-US', {
      notation: notation,
      style: 'currency',
      currency: currency,
    }).format(amount);

export const formatUrl = (url: string): string => {
  const splitted = url.match(/(?:[^\\/]|\/\/)+/g);
  if (splitted && splitted?.length > 1) {
    return splitted[0]?.replace('r.', 'www.') ?? url;
  }
  return url;
};
