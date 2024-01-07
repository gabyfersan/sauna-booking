import { Sauna } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ booke_sauna }: { booke_sauna: Sauna }) => {
  return (
    <>
      <Heading>Bokad tid</Heading>
      <Flex className='space-x-3' my='2'>
        {/* <IssueStatusBadge status={booke_sauna.shareSauna} /> */}
        <Text>
          {booke_sauna.shareSauna
            ? "Vill dela suana tiden"
            : "Vill inte dela suana tiden"}
        </Text>
        <Text>{booke_sauna.bookedAtDateAndTime.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <ReactMarkdown>{booke_sauna.message || ""}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
