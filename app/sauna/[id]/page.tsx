"use client";
import { saunaDateBaseSchema } from "@/app/validationSchemas";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Link } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import CreateAndUpdate from "../_components/CreateAndUpdate";
import useQueryGetSaunaBooking from "../_components/useQuerySauna";
import DeleteSaunaButton from "./DeleteSaunaButton";
import EditSaunaButton from "./EditSaunaButton";
import SaunaDetails from "./SaunaDetails";
import LoadingSaunaDetailPage from "./loading";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;
interface CustomSession extends Omit<Session, "user"> {
  user?: Session["user"] & { id?: string };
}

interface Props {
  params: { id: string };
}

const SaunaDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [saunaBooking, error, isLoading, refetch, isSuccess] =
    useQueryGetSaunaBooking(params.id);

  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  if (isLoading) {
    return <LoadingSaunaDetailPage />;
  }
  refetch();
  //console.log("booke_sauna, session", saunaBooking, session);
  if (!saunaBooking) {
    notFound();
  }
  return (
    <>
      <Link
        onClick={() => router.back()}
        className='flex items-center space-x-2'
      >
        <ArrowLeftIcon /> Tillbaka
      </Link>

      {saunaBooking && (
        <Grid columns={{ initial: "1", sm: "5" }} gap='5'>
          <Box className='md:col-span-4'>
            <SaunaDetails saunaBooking={saunaBooking} />
          </Box>
          {session?.user?.id === saunaBooking.bookedByUserId && (
            <Box>
              <Flex direction='column' gap='4'>
                <EditSaunaButton setShowDialog={setShowDialog} />
                <DeleteSaunaButton saunaId={saunaBooking.id} />
              </Flex>
            </Box>
          )}
        </Grid>
      )}
      {showDialog && saunaBooking && (
        <CreateAndUpdate setShowDialog={setShowDialog} booking={saunaBooking} />
      )}
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

export default SaunaDetailPage;
