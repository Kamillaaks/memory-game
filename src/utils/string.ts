export function sanitizeInitials(value: string): string {
  return value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 3);
}

export function padZero(num: number, length: number = 2): string {
  return num.toString().padStart(length, "0");
}