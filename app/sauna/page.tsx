"use client";
import { Grid } from "@radix-ui/themes";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { saunaDateBaseSchema } from "../validationSchemas";
import ColumnHours from "./_components/ColumnHours";
import CreateAndUpdate from "./_components/CreateAndUpdate";
import { LegendSauna } from "./_components/Legend";
import MatrixOfBokabelSlots from "./_components/MatrixOfBokabelSlots";
import { getAllHours } from "./_components/helperFunctions";
import LoadingSaunaPage from "./loading";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;
const allHours = getAllHours();

let styleForGrid = {
  gridTemplateColumns: "1fr 1fr 1fr 1fr  1fr  1fr  1fr 1fr 1fr  1fr  1fr  1fr",
  height: "2000px",
  width: "100%",
  overflow: "auto",
};

const Sauna = () => {
  const {
    data: saunaBooking,
    error,
    isLoading,
    refetch,
    isSuccess,
  } = useSaunaBooking();
  const { data: session } = useSession();
  useEffect(() => {
    console.log("repaint useeffetc");
    refetch();
    window.scrollTo({ top: 0 });
    const gridElement = document.getElementById("grid");

    if (gridElement && gridElement.style && gridElement.style.height) {
      gridElement.style.height =
        innerHeight - gridElement.getBoundingClientRect().top - 30 + "px";
    }

    const element = document.getElementById("scroll-into-view");
    element && element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [isSuccess]);

  console.log("repaint", session);

  const [showDialog, setShowDialog] = useState(false);
  const [dateAndTime, setDateAndTime] = useState<string>("");

  if (isLoading || !session) {
    return <LoadingSaunaPage />;
  } else {
    console.log("", isLoading && !session);
    console.log(
      "else  isLoading && !session ",
      isLoading && !session,
      isLoading,
      !session,
      isSuccess
    );
  }
  console.log("repaint 2", session);
  return (
    <>
      {showDialog && (
        <CreateAndUpdate
          dateAndTime={dateAndTime}
          refetch={refetch}
          setShowDialog={setShowDialog}
        />
      )}
      <LegendSauna />
      <Grid style={styleForGrid} id='grid'>
        <ColumnHours allHours={allHours} />
        <MatrixOfBokabelSlots
          allHours={allHours}
          setDateAndTime={setDateAndTime}
          setShowDialog={setShowDialog}
          saunaBookings={saunaBooking || []}
          session={session}
        />
      </Grid>
    </>
  );
};

type UseSaunaBookingResult = UseQueryResult<SaunaDateBaseType[]>;
const useSaunaBooking = (): UseSaunaBookingResult =>
  useQuery<SaunaDateBaseType[] | []>({
    queryKey: ["sauna"],
    queryFn: () => axios.get("/api/sauna-bookings").then(({ data }) => data),
    staleTime: 60 * 1000,
    retry: 3,
  });
export default Sauna;
