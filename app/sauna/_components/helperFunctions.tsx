const getDateFormated = (date: Date): string =>
  new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  }).format(date);

const getDateAndTimeNumerical = (date: Date): string =>
  new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

const getDateNumerical = (date: Date): string =>
  new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);

export const getADateFormated = (
  startDate: Date,
  endDate: Date
): {
  dateFormated: string[];
  dateNumerical: string;
  dateAndTimeNumerical: string;
  daysAndHours: { days: number; hours: number; minutes: number };
} => {
  const dateFormated = getDateFormated(endDate).split(" ");
  const dateNumerical = getDateNumerical(endDate);
  const dateAndTimeNumerical = getDateAndTimeNumerical(endDate);
  const daysAndHours = getDaysAndHours(startDate, endDate);

  return { dateFormated, dateNumerical, dateAndTimeNumerical, daysAndHours };
};

export const getAllDays = (numberOfDaysInTheFuture: number) => {
  const alldays = [];

  for (
    let numbersOfDays = 0;
    numbersOfDays <= numberOfDaysInTheFuture - 1;
    numbersOfDays++
  ) {
    let date = new Date();
    date.setDate(date.getDate() + numbersOfDays);

    const dateFormated = getDateFormated(date).split(" ");

    date.setDate(date.getDate());
    const dateNumerical = getDateNumerical(date);
    alldays.push({ dateFormated, dateNumerical });
  }
  return alldays;
};

export const moveToClosetsHour = (time: string) => {
  const newTime = new Date(time.slice(0, -1));
  return newTime.setHours(newTime.getHours() + 1);
};

export const getDaysAndHours = (
  startDate: Date,
  endDate: Date
): { days: number; hours: number; minutes: number } => {
  const conversionToHours = 1000 * 60 * 60;
  const date1: number = startDate.getTime();
  const date2: number = endDate.getTime();
  const diffInMs = date2 - date1;
  const days = Math.floor(diffInMs / (conversionToHours * 24));
  const hours = Math.floor(
    (diffInMs % (conversionToHours * 24)) / conversionToHours
  );
  const minutes = Math.floor((diffInMs % conversionToHours) / (1000 * 60));
  return { days, hours, minutes };
};

export const getAllHours = (): Array<string> => {
  return [
    "",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
};

export function roundDownToNearestHour(date: string) {
  var currentDateTime = new Date(date.replace("Z", ""));
  var roundedDateTime = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate(),
    currentDateTime.getHours(), // Add 1 hour to round up
    0, // Reset minutes to 0
    0 // Reset seconds to 0
  );

  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(roundedDateTime);
}
