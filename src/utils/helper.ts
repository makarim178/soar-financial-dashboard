export const fillIconColor = (fill: string): string => fill === 'light' ? "var(--soar-light)": "var(--soar-dark)" ;

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatColors = (amount: number):string => amount > 0 ? "text-trans-pos" : "text-trans-neg";