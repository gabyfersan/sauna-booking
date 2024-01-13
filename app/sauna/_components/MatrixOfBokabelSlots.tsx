import { saunaDateBaseSchema } from "@/app/validationSchemas";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  getAllDays,
  getDateAndTime,
  getSaunaBookingInformationGetter,
} from "./helperFunctions";
const allDays = getAllDays(10);
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;

const MatrixOfBokabelSlots = ({
  allHours,
  setDateAndTime,
  setShowDialog,
  saunaBookings,
  session,
}: {
  allHours: string[];
  setDateAndTime: (a: string) => void;
  setShowDialog: (a: boolean) => void;
  saunaBookings: SaunaDateBaseType[];
  session: any;
}) => {
  const router = useRouter();
  const moveToClosetsHour = (time: string) => {
    const newTime = new Date(time.slice(0, -1));
    newTime.setHours(newTime.getHours() + 1);
    // console.log("----------");
    // console.log(" newTime", newTime);
    // console.log("time", time);
    // console.log(" newTime +1 jour", newTime);
    // console.log("  new Date()", new Date());
    // console.log(
    //   " new Date().getTime()-newTime.getTime()",
    //   (new Date().getTime() - newTime.getTime()) / (1000 * 3600)
    // );
    return newTime.getTime();
  };
  console.log(
    "MatrixOfBokabelSlots saunaBookings , session",
    saunaBookings,
    session
  );
  const transformedSaunaBooking =
    getSaunaBookingInformationGetter(saunaBookings);
  const isTimeBooked = (dateAndTime: string) => {
    return !!transformedSaunaBooking(dateAndTime, "bookedByUserId");
  };

  const colorOfButton = (dateAndTime: string) => {
    if (transformedSaunaBooking(dateAndTime, "shareSauna")) {
      return "yellow";
    }
    if (isTimeBooked(dateAndTime)) {
      return "red";
    }
    return "lime";
  };

  const getDayAndTime = (day: number, time: number) => {
    return allDays[day].dateNumerical + "T" + allHours[time] + ":00.000Z";
  };

  const bookSauna = (event: any) => {
    const dateAndTime = getDateAndTime(event);

    if (!dateAndTime) {
      return;
    }
    if (isTimeBooked(dateAndTime)) {
      router.push(`/sauna/${transformedSaunaBooking(dateAndTime, "id")}`);
      return;
    }
    console.log("Setstate in MatrixOfBokabelSlots");
    setDateAndTime(dateAndTime);
    setShowDialog(true);
  };

  return (
    <>
      {Array.from(Array(10).keys()).map((day: number) => {
        return (
          <Flex
            direction='column'
            key={day}
            onClick={bookSauna}
            className={`${day === 0 ? "ml-1" : ""}`}
          >
            {Array.from(Array(25).keys()).map((i) => {
              const shouldDisabledButton =
                day === 0 &&
                new Date().getTime() > moveToClosetsHour(getDayAndTime(day, i));
              return i === 0 ? (
                <div
                  key={allDays[day].dateFormated[0]}
                  style={{ backgroundColor: "#ffd8a8" }}
                  className={` flex items-center flex-col sticky top-0 m-1  z-[2] w-24`}
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
                  disabled={shouldDisabledButton}
                  data-date-and-time={getDayAndTime(day, i)}
                  key={getDayAndTime(day, i)}
                  className={` active:bg-lime-100 m-1 ${
                    !shouldDisabledButton &&
                    session.user.id ===
                      transformedSaunaBooking(
                        getDayAndTime(day, i),
                        "bookedByUserId"
                      )
                      ? "border-4 border-rose-950 border-solid"
                      : ""
                  }`}
                >
                  <Text size='4'>
                    {!shouldDisabledButton &&
                    transformedSaunaBooking(
                      getDayAndTime(day, i),
                      "message"
                    ) ? (
                      <EnvelopeOpenIcon />
                    ) : (
                      ""
                    )}
                  </Text>
                </Button>
              );
            })}
          </Flex>
        );
      })}
    </>
  );
};

export default MatrixOfBokabelSlots;

{
  /*
                      {isTimeBooked(getDayAndTime(day, i)) ? "Bokad" : ""}
                      {day === 0 &&
                    new Date().getTime() >
                      moveToClosetsHour(getDayAndTime(day, i))
                      ? "Disabled"
                      : "Abled"} */
}
