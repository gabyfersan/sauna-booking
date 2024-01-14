import authOptions from "@/app/auth/authOptions";
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { roundDownToNearestHour } from "../_components/helperFunctions";
import SaunaTable, { SaunaQuery, columnName } from "./SaunaTable";
import LoadingSaunaListPage from "./loading";
//export const revalidate = 0;
interface CustomSession extends Omit<Session, "user"> {
  user?: Session["user"] & { id?: string };
}

interface Props {
  searchParams: SaunaQuery;
}
const SaunaBookingsPage = async ({ searchParams }: Props) => {
  //revalidatePath("/sauna/list", "page");

  const session: CustomSession | null = await getServerSession(authOptions);
  const orderBy: Prisma.SaunaOrderByWithRelationInput = columnName.includes(
    searchParams.orderBy
  )
    ? { [searchParams.orderBy]: "asc" }
    : { bookedAtDateAndTime: "asc" };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const time = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());

  const saunaBookings =
    (await prisma.user
      .findUnique({
        where: { id: session?.user!.id },
      })
      .Sauna({
        where: {
          bookedAtDateAndTime: {
            // lte: "2013-12-29T10:00:00Z",
            //gte: "2024-01-11T14:00:00Z",
            // "2024-01-11T22:06:55:00Z"
            gte: roundDownToNearestHour(time).replace(" ", "T") + ":00Z",
          },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      })) || [];

  console.log("saunaBookings", saunaBookings);
  const saunaCount = await prisma.sauna.count({});

  return (
    <Flex direction='column' gap='3'>
      {saunaCount ? (
        <SaunaTable searchParams={searchParams} saunaBookings={saunaBookings} />
      ) : (
        <LoadingSaunaListPage />
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
