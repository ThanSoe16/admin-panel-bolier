import dayjs from 'dayjs';

export function formatDate(date: Date | string | null): string {
  if (!date) return '';

  const dateFormat = dayjs(date).format('DD MMM YYYY, HH:mm');
  return dateFormat;
}

export function formatMonth(date: Date | string | null): string {
  if (!date) return '';

  const dateFormat = dayjs(date).format('DD MMM YYYY');
  return dateFormat;
}

export function formatYear(date: Date | string | null): string {
  if (!date) return '';

  const dateFormat = dayjs(date).format('MMM YYYY');
  return dateFormat;
}
