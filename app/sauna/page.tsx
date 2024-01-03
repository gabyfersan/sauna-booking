"use client";
import { AlertDialog, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { saunaDateBaseSchema, saunaSchema } from "../validationSchemas";
import SaunaFormSkeleton from "./_components/SaunaFormSkeleton";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;
const getCurrentDateAndTime = () => {
  const date = new Date();
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
};

const SaunaForm = dynamic(() => import("@/app/sauna/_components/SaunaForm"), {
  ssr: false,
  loading: () => <SaunaFormSkeleton />,
});
const bookinHours = [];

const getAllBookinHours = (index: number): { date: string }[] => {
  const allBookinHours = [];
  const all = getAll(index);
  console.log("kkkk");
  for (let i = 1; i <= 25; i++) {
    allBookinHours.push({
      date: all.dateNumerical + "T" + allHours[i - 1] + ":00.000Z",
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
  const dateNumerical = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
  return { dateFormated, dateNumerical };
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
  const newTime = new Date(time.slice(0, -1));

  return newTime.setHours(newTime.getHours() + 1);
};

let styleForGrid = {
  gridTemplateColumns: "1fr 1fr 1fr 1fr  1fr  1fr  1fr 1fr 1fr  1fr  1fr  1fr",
  height: "500px",
  width: "100%",
  overflow: "auto",
};
const extendedSaunaSchema = saunaSchema.merge(z.object({ id: z.number() }));

type SaunaFormData = z.infer<typeof extendedSaunaSchema>;
const Sauna = () => {
  console.log("repaint");
  //let saunaBooking
  const isTimeBooked = (dateAndTime: string) => {
    return transformedSaunaBooking && transformedSaunaBooking[dateAndTime];
  };

  const colorOfButton = (dateAndTime: string) => {
    if (
      isTimeBooked(dateAndTime) &&
      transformedSaunaBooking[dateAndTime].shareSauna
    ) {
      return "yellow";
    }
    if (isTimeBooked(dateAndTime)) {
      return "red";
    }
    return "lime";
  };

  const { data: saunaBooking, error, isLoading, refetch } = useSaunaBooking();
  const saunaBookingData = saunaBooking ?? [];
  const transformedSaunaBooking: Record<
    string,
    Omit<SaunaFormData, "bookedAtDateAndTime">
  > = saunaBookingData.reduce(
    (
      acc: { [key: string]: Omit<SaunaFormData, "bookedAtDateAndTime"> },
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
  console.log(transformedSaunaBooking);
  const bookSauna = (e: any) => {
    const dateAndTime =
      e.target.dataset.dateAndTime ||
      e.target.parentElement.dataset.dateAndTime;
    if (!dateAndTime) {
      return;
    }
    setDateAndTime(dateAndTime);
    setShowDialog(true);
  };
  const [showDialog, setShowDialog] = useState(false);
  const [dateAndTime, setDateAndTime] = useState<string>("");
  // const elementToScrollTo = useRef(null);
  // const refobject: { [key: string]: MutableRefObject<null> } = {
  //   "2024-01-02T12:00:00.000Z": elementToScrollTo,
  // };
  useEffect(() => {
    const gridElement = document.getElementById("grid");

    if (gridElement && gridElement.style && gridElement.style.height) {
      gridElement.style.height =
        innerHeight - gridElement.getBoundingClientRect().top - 30 + "px";
    }
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

    const element = document.getElementById("scroll-into-view");
    element && element.scrollIntoView({ behavior: "smooth", block: "center" });
    // window.scrollTo({
    //   top: elementToScrollTo.current ? elementToScrollTo.current.offsetTop : 0,
    //   behavior: "smooth",
    // })
  }, []);

  let getAllBookinHoursDayAndI: { date: string }[];
  return (
    <>
      <Toaster />
      <AlertDialog.Root open={showDialog}>
        <AlertDialog.Content>
          <AlertDialog.Title>Boka tid</AlertDialog.Title>
          <AlertDialog.Description>
            Boka tiden {dateAndTime.slice(0, -8).replace("T", "  ")}
          </AlertDialog.Description>
          <SaunaForm
            dateAndTime={dateAndTime}
            refetch={refetch}
            setShowDialog={setShowDialog}
          />
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
                  // backgroundColor: "#ffd8a8",
                  backgroundColor: "#80b08c",
                  overflow: "clip",
                  zIndex: 99,
                }}
                id={
                  parseInt(a.split(":")[0]) - new Date().getHours() === 0
                    ? "scroll-into-view"
                    : ""
                }
                className={`flex items-center justify-center sticky left-0 `}
              >
                <Text size='4'>{a}</Text>
              </div>
            )
          )}
        </Flex>
        {Array.from(Array(10).keys()).map((day) => {
          getAllBookinHoursDayAndI = getAllBookinHours(day);
          return (
            <Flex direction='column' key={day} onClick={bookSauna}>
              {Array.from(Array(25).keys()).map((i) => {
                // const timeDiff =
                //   new Date().getTime() -
                //   new Date(getAllBookinHoursDayAndI[i].date).getTime();
                // const refProp =
                //   timeDiff / 60000 < 60 && timeDiff > 0
                //     ? { ref: elementToScrollTo }
                //     : {};

                return i === 0 ? (
                  <div
                    key={getDateFormated(day).date[1]}
                    style={{
                      margin: "2px",
                      // borderRadius: "5px",
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
                      {getDateFormated(day).date[1] +
                        " " +
                        getDateFormated(day).date[2]}
                    </Text>
                  </div>
                ) : (
                  <Button
                    color={
                      // transformedSaunaBooking &&
                      // transformedSaunaBooking[getAllBookinHoursDayAndI[i].date]
                      //   ? "red"
                      //   : "lime"
                      colorOfButton(getAllBookinHoursDayAndI[i].date)
                    }
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
                    }}
                    className={`flex items-center justify-center active:bg-lime-100`}
                  >
                    <Text size='4'>
                      {isTimeBooked(getAllBookinHoursDayAndI[i].date)
                        ? "Bokad"
                        : "Boka"}
                    </Text>
                  </Button>
                );
              })}
            </Flex>
          );
        })}
      </Grid>
    </>
  );
};

const useSaunaBooking = () =>
  useQuery<SaunaDateBaseType[] | []>({
    queryKey: ["sauna"],
    queryFn: () => axios.get("/api/sauna-bookings").then(({ data }) => data),
    staleTime: 60 * 1000,
    retry: 3,
  });
export default Sauna;
