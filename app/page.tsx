import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession();
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  if (!session) {
    return (
      <Flex className='justify-center'>
        <img src='/nbs.jpeg' />
      </Flex>
    );
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View a summary of project issues",
};
