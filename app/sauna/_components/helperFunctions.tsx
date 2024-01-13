import { saunaDateBaseSchema, saunaSchema } from "@/app/validationSchemas";
import { MouseEvent } from "react";
import { z } from "zod";
import { DateFormated } from "./type";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;

const extendedSaunaSchema = saunaSchema.merge(z.object({ id: z.number() }));
type SaunaFormData = z.infer<typeof extendedSaunaSchema>;

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
): DateFormated => {
  const dateFormated = getDateFormated(endDate).split(" ");
  const dateNumerical = getDateNumerical(endDate);
  const dateAndTimeNumerical = getDateAndTimeNumerical(endDate);
  const daysAndHours = getDaysAndHours(startDate, endDate);
  const howManyDays =
    parseInt(
      new Intl.DateTimeFormat("sv-SE", {
        day: "numeric",
      }).format(endDate)
    ) -
    parseInt(
      new Intl.DateTimeFormat("sv-SE", {
        day: "numeric",
      }).format(startDate)
    );

  return {
    dateFormated,
    dateNumerical,
    dateAndTimeNumerical,
    daysAndHours,
    howManyDays,
  };
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

export const getSaunaBookingInformationGetter = (
  saunaBookings: SaunaDateBaseType[]
) => {
  const transformedSaunaBooking: Record<
    string,
    Omit<SaunaFormData, "bookedAtDateAndTime">
  > = getTransformedSaunaBooking(saunaBookings);

  return (time: string, key: string): any => {
    // Remove Any
    if (transformedSaunaBooking[time]) {
      return (transformedSaunaBooking[time] as any)[key] ?? null;
    }
    return null;
  };
};

const getTransformedSaunaBooking = (saunaBookings: SaunaDateBaseType[]) => {
  return saunaBookings.reduce(
    (
      acc: Record<string, Omit<SaunaFormData, "bookedAtDateAndTime">>,
      item: SaunaDateBaseType
    ) => {
      acc[item.bookedAtDateAndTime] = {
        id: item.id,
        message: item.message,
        shareSauna: item.shareSauna,
        bookedByUserId: item.bookedByUserId,
      };
      return acc;
    },
    {}
  );
};

export const getDateAndTime = (event: MouseEvent<HTMLButtonElement>) => {
  let dateAndTime;
  let targetElement: HTMLElement = event.target as HTMLElement;
  while (!dateAndTime) {
    if (targetElement.dataset.dateAndTime) {
      dateAndTime = targetElement.dataset.dateAndTime;
    }
    targetElement = targetElement.parentElement!;
  }

  return dateAndTime;
};


export const dymanicDate = (dateFormated: DateFormated) => {
  const daysAndHours = dateFormated.daysAndHours;
  const daysLabel = ["I dag", "I morgon", "I övermorgon"];
  const numberOfHours = daysAndHours.days * 24 + daysAndHours.hours;
  let text =
    daysAndHours.days === 0 && daysAndHours.hours === 0
      ? " om " + daysAndHours.minutes + " minuter"
      : daysLabel[dateFormated.howManyDays] +
        " om dryga " +
        numberOfHours +
        (daysAndHours.hours === 1 ? " timme" : " timmar");

  text =
    daysAndHours.days < 0 ||
    daysAndHours.hours < 0 ||
    daysAndHours.minutes < 0
      ? "Nu"
      : text;

  text =
    dateFormated.howManyDays > 2
      ? "Om " + dateFormated.howManyDays + " dagar"
      : text;

  return text;
};