"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ saunaId }: { saunaId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const deleteIssue = async () => {
    try {
      setisDeleting(true);
      await axios.delete(`/api/sauna-bookings/${saunaId}`);
      router.push("/sauna", { scroll: false });
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
            Delete Issue {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
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

export default DeleteIssueButton;