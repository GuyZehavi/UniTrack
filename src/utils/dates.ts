const padDatePart = (value: number): string => String(value).padStart(2, "0");

export const formatDate = (date: Date): string =>
  `${padDatePart(date.getDate())}/${padDatePart(date.getMonth() + 1)}/${date.getFullYear()}`;

export const parseDate = (value: string): Date => {
  const dateParts = value.split("/").map(Number);

  if (
    dateParts.length === 3 &&
    dateParts.every(Number.isInteger) &&
    dateParts[2] > 0
  ) {
    const [day, month, year] = dateParts;
    return new Date(year, month - 1, day);
  }

  return new Date(value);
};

export const formatDateString = (value: string): string =>
  formatDate(parseDate(value));
