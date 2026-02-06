function isEnglishAlphanumeric(str: string): boolean {
  // Allow letters, numbers, spaces, hyphens, and ampersand (&)
  return /[a-zA-Z]/.test(str);
}

export function filterEnglishAlphanumericStrings(strings: string[]): string[] {
  return strings.filter(isEnglishAlphanumeric);
}
