import { saunaDateBaseSchema } from "@/app/validationSchemas";
import { Sauna } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;

const SaunaDetails = ({ saunaBooking }: { saunaBooking: SaunaDateBaseType }) => {
  return (
    <>
      <Heading>Bokad tid</Heading>
      <Flex className='space-x-3' my='2'>
        {/* <IssueStatusBadge status={booke_sauna.shareSauna} /> */}
        <Text>
          {saunaBooking.shareSauna
            ? "Vill dela bastun med någon annan"
            : "Vill inte dela bastun"}
        </Text>
        <Text>{saunaBooking.bookedAtDateAndTime.toString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <ReactMarkdown>{saunaBooking.message || ""}</ReactMarkdown>
      </Card>
    </>
  );
};

export default SaunaDetails;
