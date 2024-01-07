import { saunaDateBaseSchema, saunaSchema } from "@/app/validationSchemas";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { getAllDays, moveToClosetsHour } from "./helperFunctions";
const allDays = getAllDays(10);
console.log(allDays)
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;
const extendedSaunaSchema = saunaSchema.merge(z.object({ id: z.number() }));
type SaunaFormData = z.infer<typeof extendedSaunaSchema>;

const MatrixOfBokabelSlots = ({
  allHours,
  setDateAndTime,
  setShowDialog,
  saunaBooking,
}: {
  allHours: string[];
  setDateAndTime: (a: string) => void;
  setShowDialog: (a: boolean) => void;
  saunaBooking: SaunaDateBaseType[];
}) => {
  const router = useRouter();
  console.log("MatrixOfBokabelSlots");
  const transformedSaunaBooking: Record<
    string,
    Omit<SaunaFormData, "bookedAtDateAndTime">
  > = saunaBooking.reduce(
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

  const getDayAndTime = (day: number, time: number) => {
    return allDays[day].dateNumerical + "T" + allHours[time] + ":00.000Z";
  };

  const bookSauna = (e: any) => {
    const dateAndTime =
      e.target.dataset.dateAndTime ||
      e.target.parentElement.dataset.dateAndTime;
    if (!dateAndTime) {
      return;
    }
    if (isTimeBooked(dateAndTime)) {
      router.push(`/sauna/${transformedSaunaBooking[dateAndTime].id}`);
      return;
    }

    setDateAndTime(dateAndTime);
    setShowDialog(true);
  };

  return (
    <>
      {Array.from(Array(10).keys()).map((day: number) => {
        return (
          <Flex direction='column' key={day} onClick={bookSauna}>
            {Array.from(Array(25).keys()).map((i) => {
              return i === 0 ? (
                <div
                  key={allDays[day].dateFormated[0]}
                  style={{
                    // margin: "2px",
                    backgroundColor: "#ffd8a8",
                    //  opacity: 1,
                     // zIndex: 2,
                  }}
                  className={` flex items-center flex-col sticky top-0 m-1  z-[2]`}
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
                  style={
                    {
                      // margin: "2px 2px 2px 2px",
                    }
                  }
                  className={` active:bg-lime-100 m-1`}
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
    </>
  );
};

export default MatrixOfBokabelSlots;
