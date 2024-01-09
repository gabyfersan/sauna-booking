import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import LoadingSaunaPage from "./loading";
import SaunaTable, { SaunaQuery, columnName } from "./SaunaTable";

interface Props {
  searchParams: SaunaQuery;
}
const SaunaBookingsPage = async ({ searchParams }: Props) => {
  // const status: Status | undefined = Status[searchParams.status]
  //   ? searchParams.status
  //   : undefined;
  const orderBy = columnName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 30;
  const saunaBookings = await prisma.sauna.findMany({
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const saunaCount = await prisma.sauna.count({});

  return (
    <Flex direction='column' gap='3'>
      {/* <IssueActions /> */}
      {saunaCount ? (
        <SaunaTable searchParams={searchParams} saunaBookings={saunaBookings} />
      ) : (
        <LoadingSaunaPage />
      )}
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={saunaCount}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Lista på bokade bastutider",
  description: "Se alla bokade tider",
};

export const dynamic = "force-dynamic";
export default SaunaBookingsPage;
