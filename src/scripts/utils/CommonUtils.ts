export function isAddress(value: string): boolean {
  if (!value.startsWith('0x')) return false;

  return 42 == value.length;
}
