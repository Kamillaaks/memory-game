/**
 * Renser brukerens initialer før lagring til high scores.
 *
 * Hvorfor vi trenger denne:
 *   - Brukeren kan skrive inn hva som helst i initialer-feltet.
 *   - Vi vil bare tillate bokstaver (A-Z), for konsistent visning på topplisten.
 *   - Vi tvinger store bokstaver og begrenser til 3 tegn, som er spillets format.
 *
 * Brukes i: WonView.ts (input-feltet for initialer)
 */
export function sanitizeInitials(value: string): string {
  return value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 3);
}

/**
 * Formaterer et tall med ledende nuller.
 *
 * Hvorfor vi trenger denne:
 *   - Tid skal vises som "01:05", ikke "1:5".
 *   - Rangering på topplisten skal vises som "01", "02"... ikke "1", "2".
 *   - Å duplisere `.toString().padStart(2, "0")` overalt er rotete og lett å gjøre feil.
 *
 * Brukes i: time.ts (tidsformatering), HighScoresView.ts (rangering)
 */
export function padZero(num: number, length: number = 2): string {
  return num.toString().padStart(length, "0");
}