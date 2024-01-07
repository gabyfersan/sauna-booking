import authOptions from "@/app/auth/authOptions";
import { Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const fecthBookedSauna = cache((issueId: number) =>
  prisma.sauna.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  console.log("id sauna", parseInt(params.id));
  const session = await getServerSession(authOptions);
  const booke_sauna = await fecthBookedSauna(parseInt(params.id));
  console.log("booke_sauna", booke_sauna);
  if (!booke_sauna) {
    notFound();
  }
  return (
    <>
      <Button>
        <Link href={`/sauna`}>Tillbaka</Link>
      </Button>
      <Grid columns={{ initial: "1", sm: "5" }} gap='5'>
        <Box className='md:col-span-4'>
          <IssueDetails booke_sauna={booke_sauna} />
        </Box>
        {session && (
          <Box>
            <Flex direction='column' gap='4'>
              {/* <AssigneeSelect issue={issue} /> */}
              <EditIssueButton issueId={booke_sauna.id} />
              <DeleteIssueButton saunaId={booke_sauna.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    </>
  );
};

// export async function generateMetadata({ params }: Props) {
//   const issue = await fecthIssues(parseInt(params.id));
//   return {
//     title: issue?.title,
//     description: `Details of issues ${issue?.id}`,
//   };
// }

export default IssueDetailPage;
