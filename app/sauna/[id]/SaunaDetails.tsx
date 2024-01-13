import { saunaDateBaseSchema } from "@/app/validationSchemas";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import { dymanicDate, getADateFormated } from "../_components/helperFunctions";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;

const SaunaDetails = ({
  saunaBooking,
}: {
  saunaBooking: SaunaDateBaseType;
}) => {
  const dateFormated = getADateFormated(
    new Date(),
    new Date(saunaBooking.bookedAtDateAndTime.toString().slice(0, -1))
  );

  return (
    <>
      <Heading>Bokad tid</Heading>
      <Flex className=' flex-col' my='3'>
        <Text>
          {dateFormated.dateAndTimeNumerical + ", " + dymanicDate(dateFormated)}{" "}
        </Text>
        <Text>
          {saunaBooking.shareSauna
            ? "Vill dela bastun med någon annan"
            : "Vill inte dela bastun"}
        </Text>
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <ReactMarkdown>{saunaBooking.message || ""}</ReactMarkdown>
      </Card>
    </>
  );
};

export default SaunaDetails;
