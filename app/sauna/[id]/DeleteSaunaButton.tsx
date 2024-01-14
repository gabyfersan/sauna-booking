"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteSaunaButton = ({ saunaId }: { saunaId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const deleteSaunaBooking = async () => {
    try {
      setisDeleting(true);
      await axios.delete(`/api/sauna-bookings/${saunaId}`);
      router.push("/sauna", { scroll: false });
      //router.back();
      toast.success("Tiden är avbokad");
      //router.refresh();
      setisDeleting(false);
    } catch (error) {
      setError(true);
      setisDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Radera bokningen {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Är du säker på att radera bokningen. Det går inte att ångra
          </AlertDialog.Description>
          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Avbryt
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={deleteSaunaBooking}>
                Radera bokning
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Bokningen gick inte att radera
          </AlertDialog.Description>
          <Button
            color='gray'
            variant='soft'
            mt='2'
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteSaunaButton;
