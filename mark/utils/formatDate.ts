export default function formatDate(input: string): string | null {
  if (!input) return null;

  const [day, month, year] = input.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  if (isNaN(date.getTime())) return null; // Check for invalid date

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // e.g., "Jun 16"
}
