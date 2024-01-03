"use client";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { saunaDateBaseSchema, saunaSchema } from "../validationSchemas";
import CreateAndUpdate from "./_components/CreateAndUpdate";
import {
  getAllDays,
  getAllHours,
  moveToClosetsHour,
} from "./_components/helperFunctions";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;
const extendedSaunaSchema = saunaSchema.merge(z.object({ id: z.number() }));
type SaunaFormData = z.infer<typeof extendedSaunaSchema>;

const allHours = getAllHours();
const allDays = getAllDays(10);
const getDayAndTime = (day: number, time: number) => {
  //console.log("getDayAndTime");
  return allDays[day].dateNumerical + "T" + allHours[time] + ":00.000Z";
};

let styleForGrid = {
  gridTemplateColumns: "1fr 1fr 1fr 1fr  1fr  1fr  1fr 1fr 1fr  1fr  1fr  1fr",
  height: "500px",
  width: "100%",
  overflow: "auto",
};

const Sauna = () => {
  console.log("repaint");
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

  useEffect(() => {
    const gridElement = document.getElementById("grid");

    if (gridElement && gridElement.style && gridElement.style.height) {
      gridElement.style.height =
        innerHeight - gridElement.getBoundingClientRect().top - 30 + "px";
    }

    const element = document.getElementById("scroll-into-view");
    element && element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <>
      <Toaster />
      {showDialog && (
        <CreateAndUpdate
          dateAndTime={dateAndTime}
          refetch={refetch}
          setShowDialog={setShowDialog}
        />
      )}
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
          return (
            <Flex direction='column' key={day} onClick={bookSauna}>
              {Array.from(Array(25).keys()).map((i) => {
                return i === 0 ? (
                  <div
                    key={allDays[day].dateFormated[0]}
                    style={{
                      margin: "2px",
                      backgroundColor: "#ffd8a8",
                      opacity: 1,
                      zIndex: 1,
                    }}
                    className={`flex items-center justify-center flex-col sticky top-0  `}
                  >
                    <Text size='3' className='block'>
                      {allDays[day].dateFormated[0]}
                    </Text>
                    <Text size='3'>
                      {allDays[day].dateFormated[1] +
                        " " +
                        allDays[day].dateFormated[2]}
                    </Text>
                  </div>
                ) : (
                  <Button
                    color={colorOfButton(getDayAndTime(day, i))}
                    variant='classic'
                    size='4'
                    disabled={
                      new Date().getTime() >
                      moveToClosetsHour(getDayAndTime(day, i))
                    }
                    data-date-and-time={getDayAndTime(day, i)}
                    key={getDayAndTime(day, i)}
                    style={{
                      margin: "2px 2px 2px 2px",
                    }}
                    className={`flex items-center justify-center active:bg-lime-100`}
                  >
                    <Text size='4'>
                      {isTimeBooked(getDayAndTime(day, i)) ? "Bokad" : "Boka"}
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
