import { padZero } from "./string";

export function formatElapsedTime(startTime: number, endTime?: number): string {
  const end = endTime || Date.now();
  const elapsed = Math.floor((end - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
}