export default function formatThaiDate(isoDate: string): string {
  const date = new Date(isoDate);

  const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  const day = date.getUTCDate();
  const month = thaiMonths[date.getUTCMonth()];
  const buddhistYear = date.getUTCFullYear() + 543;
  const yearShort = buddhistYear.toString().slice(-2);

  return `${day} ${month} ${yearShort}`;
}

export function formatEngDate(isoDate: string): string {
  const date = new Date(isoDate);

  const engMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  const day = date.getUTCDate();
  const month = engMonths[date.getUTCMonth()];
  const buddhistYear = date.getUTCFullYear() + 543;
  const yearShort = buddhistYear.toString().slice(-2);

  return `${day} ${month} ${yearShort}`;
}