
export const getShamsiDate = (): string => {
  try {
    // Uses the browser's built-in Intl API for localization, no external library needed.
    // 'fa-IR' is the locale for Persian/Iran.
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
  } catch (e) {
    // Fallback for older environments that might not support it
    return new Date().toLocaleDateString('fa-IR');
  }
};
