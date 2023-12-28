"use client";
import { AlertDialog, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const bookinHours = [];

const getAllBookinHours = (index: number): { date: string }[] => {
  const allBookinHours = [];
  const all = getAll(index);
  console.log("kkkk");
  for (let i = 1; i <= 25; i++) {
    allBookinHours.push({
      date: all.dateNumerical + "T" + allHours[i - 1],
    });
  }
  return allBookinHours;
};

const getDateFormated = (index: number): { date: string[] } => {
  return {
    date: getAll(index).dateFormated,
  };
};

const getAll = (addNumbersOfDays: number) => {
  //.toISOString().slice(0, 10);
  //   const dateNow = new Date();
  //   dateNow.setDate(dateNow.getDate() + addNumbersOfDays);

  //   //let time = new Date();
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // dateNow.toLocaleTimeString('sv-SE', options).split(" ");

  let date = new Date();
  date.setDate(date.getDate() + addNumbersOfDays);

  const dateFormated = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .split(" ");

  date.setDate(date.getDate());
  //date.toISOString().slice(0, 11);
  //const dateNumerical = date.toISOString().slice(0, 11);
  const dateNumerical = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
  return { dateFormated, dateNumerical };
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // };
  // return date.toLocaleTimeString("sv-SE", options).split(" ");

  //return date.toISOString().slice(0, 10);
};

const getAllHours = () => {
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

const allHours = getAllHours();

const moveToClosetsHour = (time: string) => {
  const newTime = new Date(time);

  return newTime.setHours(newTime.getHours() + 1);
};

let base = {
  //border: "2px solid #ffa94d",
  //"border-radius": "5px",
  //color: "#d9480f",
  //"text-align": "center",
  //"box-sizing": "border-box;",
};

let styleForTime = {
  "background-color": "#ffd8a8",
  ...base,
  width: "4.5em",
  height: "3em",
  //"background-color": "#ffd8a8",
  margin: "2px 2px 2px 0",
  overflow: "clip",
};

let styleForBooking = {
  ...base,
  //width: "6em",
  //height: "4.2em",
  //"background-color": "green",
  margin: "2px",
  //"z-index": "-1",
};

let styleForGrid = {
  gridTemplateColumns: "1fr 1fr 1fr 1fr  1fr  1fr  1fr 1fr 1fr  1fr  1fr  1fr",
  //  "position": "fixed"
  //contain: "paint",
  height: "500px",
  width: "100%",
  overflow: "auto",
};

const Sauna = () => {
  const bookSauna = (e: any) => {
    console.log(e.target);
    console.log(e.target.dataset.dateAndTime);
    setShowDialog(true);
  };
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    // if (
    //   document &&
    //   document.getElementById("grid") &&
    //   document.getElementById("grid").style &&
    //   document.getElementById("grid").style.height
    // ) {
    //   document.getElementById("grid").style.height =
    //     innerHeight -
    //     document.getElementById("grid").getBoundingClientRect().top -
    //     30 +
    //     "px";
    // }
  }, []);
  //const allHours = getAllHours();
  //console.log(allHours);
  let getAllBookinHoursDayAndI: { date: string }[];
  return (
    <>
      {" "}
      <AlertDialog.Root open={showDialog}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            color='gray'
            variant='soft'
            mt='2'
            onClick={() => setShowDialog(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Grid style={styleForGrid} id='grid'>
        <Flex
          direction='column'
          // gap='0'
          className=' sticky left-0  bg-white'
          style={{
            zIndex: 10,
          }}
        >
          {allHours.map((a, i) =>
            i === 0 ? (
              <div
                key='jjj'
                style={{
                  width: "4.5em",
                  height: "3em",
                  margin: "2px 2px 2px 0",
                }}
              ></div>
            ) : (
              <div
                key={a}
                style={{
                  width: "4.5em",
                  height: "3em",
                  margin: "2px 2px 2px 0",
                  borderRadius: "5px",
                  backgroundColor: "#ffd8a8",
                  overflow: "clip",
                  zIndex: 99,
                }}
                className={`flex items-center justify-center sticky left-0 `}
              >
                <Text size='6'>{a}</Text>
              </div>
            )
          )}
        </Flex>
        {Array.from(Array(10).keys()).map((day) => {
          getAllBookinHoursDayAndI = getAllBookinHours(day);
          return (
            <Flex direction='column' key={day} onClick={bookSauna}>
              {Array.from(Array(25).keys()).map((i) =>
                i === 0 ? (
                  <div
                    key={getDateFormated(day).date[1]}
                    style={{
                      margin: "2px",
                      borderRadius: "5px",
                      backgroundColor: "#ffd8a8",
                      opacity: 1,
                      zIndex: 1,
                    }}
                    className={`flex items-center justify-center flex-col sticky top-0  `}
                  >
                    <Text size='3' className='block'>
                      {getDateFormated(day).date[0]}
                    </Text>
                    <Text size='3'>
                      {" "}
                      {getDateFormated(day).date[1] +
                        " " +
                        getDateFormated(day).date[2]}
                    </Text>
                  </div>
                ) : (
                  <Button
                    data-te-ripple-init
                    data-te-ripple-unbound='true'
                    color='lime'
                    variant='classic'
                    size='4'
                    disabled={
                      new Date().getTime() >
                      moveToClosetsHour(getAllBookinHoursDayAndI[i].date)
                    }
                    data-date-and-time={getAllBookinHoursDayAndI[i].date}
                    key={getAllBookinHoursDayAndI[i].date}
                    style={{
                      margin: "2px 2px 2px 2px",
                      // zIndex: -2,
                    }}
                    className={`flex items-center justify-center flex-col active:bg-lime-100`}
                  >
                    <Text size='2'>{getAllBookinHoursDayAndI[i].date}</Text>
                  </Button>
                )
              )}
            </Flex>
          );
        })}
      </Grid>
    </>
  );
};

export default Sauna;
