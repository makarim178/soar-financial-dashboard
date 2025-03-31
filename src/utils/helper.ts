export const fillIconColor = (fill: string): string => fill === 'light' ? "var(--soar-light)": "var(--soar-dark)" ;

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatColors = (amount: number):string => amount > 0 ? "text-trans-pos" : "text-trans-neg";

export default function wrapPromise(promise: Promise<unknown>) {
  let status = 'pending';
  let result: unknown;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}