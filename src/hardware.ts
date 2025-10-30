/**
 * Simple in-memory hardware ID registry
 * Replace with database for production
 */
const verifiedIds = new Set<string>();

export function isVerified(id: string): boolean {
  return verifiedIds.has(id.toLowerCase());
}

export function addHardwareId(id: string): void {
  verifiedIds.add(id.toLowerCase());
}

export function removeHardwareId(id: string): void {
  verifiedIds.delete(id.toLowerCase());
}
