"use client";
import { AlertDialog, Button } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import SaunaFormSkeleton from "./SaunaFormSkeleton";
//import SaunaForm from "./SaunaForm";

const SaunaForm = dynamic(() => import("@/app/sauna/_components/SaunaForm"), {
  ssr: false,
  loading: () => <SaunaFormSkeleton />,
});

const createAndUpdate = ({
  dateAndTime,
  refetch,
  setShowDialog,
}: {
  dateAndTime: string;
  refetch: () => void;
  setShowDialog: (a: boolean) => void;
}) => {
  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Content>
        <AlertDialog.Title>Boka tid</AlertDialog.Title>
        <AlertDialog.Description>
          Boka tiden {dateAndTime.slice(0, -8).replace("T", "  ")}
        </AlertDialog.Description>
        <SaunaForm
          dateAndTime={dateAndTime}
          refetch={refetch}
          setShowDialog={setShowDialog}
        />
        <Button
          color='gray'
          variant='soft'
          mt='2'
          onClick={() => setShowDialog(false)}
        >
          OK
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default createAndUpdate;
