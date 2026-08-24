export function hexStringToNumber(hex: string, fallback = 0x000000) {
  const normalized = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback;
  }
  return parseInt(normalized, 16);
}
