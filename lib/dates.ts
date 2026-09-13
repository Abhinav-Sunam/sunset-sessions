const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateShort(dateStr: string): string {
  const date = parseDate(dateStr);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function formatDateLong(dateStr: string): string {
  const date = parseDate(dateStr);
  const dayName = DAYS[date.getDay()];
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${day} ${month} ${year}`;
}

export function formatMonthYear(dateStr: string): string {
  const date = parseDate(dateStr);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function isPastEvent(dateStr: string, referenceDate: Date = new Date()): boolean {
  const eventDate = parseDate(dateStr);
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);
  return eventDate < ref;
}
