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

export const moveToClosetsHour = (time: string) => {
  const newTime = new Date(time.slice(0, -1));

  return newTime.setHours(newTime.getHours() + 1);
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
