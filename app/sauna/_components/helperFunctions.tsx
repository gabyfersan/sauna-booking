export const getAllDays = (numberOfDaysInTheFuture: number) => {
  console.log("getall");
  const alldays = [];

  for (
    let umbersOfDays = 0;
    umbersOfDays <= numberOfDaysInTheFuture - 1;
    umbersOfDays++
  ) {
    let date = new Date();
    date.setDate(date.getDate() + umbersOfDays);

    const dateFormated = new Intl.DateTimeFormat("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
      .format(date)
      .split(" ");

    date.setDate(date.getDate());
    const dateNumerical = new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
    alldays.push({ dateFormated, dateNumerical });
  }
  return alldays;
};

// const getCurrentDateAndTime = () => {
//   const date = new Date();
//   return new Intl.DateTimeFormat("sv-SE", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//   }).format(date);
// };

// const getAllBookinHours = (index: number): { date: string }[] => {
//   const allBookinHours = [];
//   const all = getAll(index);
//   console.log("getAllBookinHours");
//   for (let i = 1; i <= 25; i++) {
//     allBookinHours.push({
//       date: all.dateNumerical + "T" + allHours[i - 1] + ":00.000Z",
//     });
//   }
//   return allBookinHours;
// };

// const getDateFormated = (index: number): { date: string[] } => {
//   console.log("getDateFormated");
//   return {
//     date: getAll(index).dateFormated,
//   };
// };

export const getAllHours = (): Array<string> => {
  console.log("getAllHours");
  const hours = [""];
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);

  for (let i = 1; i < 25; i++) {
    currentDate.setHours(currentDate.getHours() + 1);
    hours.push(currentDate.toISOString().slice(11, 16));
  }
  return hours;
};

export const moveToClosetsHour = (time: string) => {
  const newTime = new Date(time.slice(0, -1));

  return newTime.setHours(newTime.getHours() + 1);
};
