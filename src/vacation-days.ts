export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  if (startDate.getFullYear() === untilDate.getFullYear() &&
      startDate.getMonth() === 0 && startDate.getDate() === 1 &&
      untilDate.getMonth() === 11 && untilDate.getDate() === 31 &&
      percentage === 100) {
    return vacationDays; // Vollzeit über das ganze Jahr
  }

  const daysInYear = 365;
  const daysWorked = calculateDaysBetween(startDate, untilDate);

  return (vacationDays * daysWorked / daysInYear) * (percentage / 100);
}

function calculateDaysBetween(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // Stunden*Minuten*Sekunden*Millisekunden
  return Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)) + 1; // + 1 da beide Tage mitgerechnet werden sollen.
}