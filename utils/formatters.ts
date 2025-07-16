/**
 * Formats bytes into a human-readable string (e.g., KB, MB, GB).
 * @param {number} bytes The number of bytes.
 * @param {number} decimals The number of decimal places to display.
 * @returns {string} The formatted file size string.
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 بایت';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedNumber = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${new Intl.NumberFormat('fa-IR').format(formattedNumber)} ${sizes[i]}`;
};
