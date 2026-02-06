/**
 * @param url - The URL to format
 * @returns - formatted url
 *
 * I(Daung) has written this function to format a url get from input to formatted url that is ready to use in anchor tag href prop
 */

export const PHONE_NUMBER_REGEX = /^[+\d\s\-()]{6,15}$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formatAnchorTagValue = (url: string): string => {
  const trimmed = url.trim();
  const isPhone = PHONE_NUMBER_REGEX.test(trimmed);
  const isEmail = EMAIL_REGEX.test(trimmed);

  if (isPhone) {
    const cleaned = trimmed.replace(/\s+/g, '');
    return trimmed.startsWith('tel:') ? trimmed : `tel:${cleaned}`;
  }

  if (isEmail) {
    return trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`;
  }

  return trimmed?.includes(':') ? trimmed : `https://${trimmed}`;
};

export default formatAnchorTagValue;
