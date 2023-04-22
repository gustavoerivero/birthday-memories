export const timeFormat = (date: Date | string | number): string => {
  if (!date) return '00:00:00'

  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  let mm: number | string = date.getUTCMinutes();
  let ss: number | string = date.getSeconds();
  let cm: number | string = Math.round(date.getMilliseconds() / 10);

  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;
  cm = cm < 100 ? `0${cm}` : cm;

  return `${mm}:${ss}:${cm}`;
}