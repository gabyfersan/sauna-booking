"use client";
import { saunaDateBaseSchema } from "@/app/validationSchemas";
import { AlertDialog, Button } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { z } from "zod";
import SaunaFormSkeleton from "./SaunaFormSkeleton";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;
//import SaunaForm from "./SaunaForm";

const SaunaForm = dynamic(() => import("@/app/sauna/_components/SaunaForm"), {
  ssr: false,
  loading: () => <SaunaFormSkeleton />,
});

const createAndUpdate = ({
  dateAndTime,
  refetch,
  setShowDialog,
  booking,
}: {
  booking?: SaunaDateBaseType;
  dateAndTime?: string;
  refetch?: () => void;
  setShowDialog: (a: boolean) => void;
}) => {
  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Content>
        <AlertDialog.Title>{`${
          booking ? "Ändra bokning" : "Boka tiden"
        }`}</AlertDialog.Title>
        <AlertDialog.Description>
          {`${
            booking
              ? booking.bookedAtDateAndTime.slice(0, -8).replace("T", "  ")
              : dateAndTime!.slice(0, -8).replace("T", "  ")
          }`}
        </AlertDialog.Description>
        <SaunaForm
          booking={booking}
          dateAndTime={dateAndTime}
          refetch={refetch}
          setShowDialog={setShowDialog}
        />
        <Button
          color='gray'
          variant='soft'
          mt='2'
          onClick={() => setShowDialog(false)}
          className='relative bottom-9'
        >
          Stäng
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default createAndUpdate;
