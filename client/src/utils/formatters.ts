export const formatCurrency = (amount: number, locale = 'en-IN', currency = 'INR'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);

export const formatDate = (dateStr: string, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-IN', options ?? defaultOptions).format(new Date(dateStr));
};

export const formatMonthYear = (year: number, month: number): string => {
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat('en-IN', { month: 'short', year: '2-digit' }).format(date);
};

export const toInputDateValue = (dateStr: string): string => {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
