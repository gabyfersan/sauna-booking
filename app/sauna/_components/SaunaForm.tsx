"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { patchSaunaSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sauna } from "@prisma/client";
import { Button, Callout, Checkbox, Link } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

// Create a new interface by merging the existing DefaultSession and the 'id' property
interface CustomSession extends Omit<Session, "user"> {
  user?: Session["user"] & { id?: string };
}

type SaunaFormData = z.infer<typeof patchSaunaSchema>;

const SaunaForm = ({
  booking,
  dateAndTime,
  refetch,
  setShowDialog,
}: {
  booking?: Sauna;
  dateAndTime: string;
  refetch: () => void;
  setShowDialog: (a: boolean) => void;
}) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SaunaFormData>({
    resolver: zodResolver(patchSaunaSchema),
  });

  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  // const { status, data: session }: any = useSession();
  if (status === "loading") {
    return <Skeleton width='3rem' />;
  }
  if (status === "unauthenticated") {
    return (
      <Link className='nav-link' href='/api/auth/signin'>
        Login
      </Link>
    );
  }
  const [error, setError] = useState<string>("");
  const onSubmit = handleSubmit(
    async (data) => {
      try {
        console.log("data", data);
        if (booking) {
          await axios.patch(`/api/sauna-bookings/${booking.id}`, data);
        } else {
          await axios.post("/api/sauna-bookings", {
            ...data,
            bookedAtDateAndTime: dateAndTime,
            bookedByUserId: session!.user!.id || "",
          });
          refetch();
          setShowDialog(false);
          toast.success("Tiden bokad");
        }
        // router.push("/issues/list");
        // router.refresh();
      } catch (error) {
        setError("An unexpected error occurred.");
      }
    },
    (data) => {
      console.log("error", data);
    }
  );
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className='space-y-3' onSubmit={onSubmit}>
        <label>
          Checkbox Field:
          <Controller
            name='shareSauna'
            control={control}
            defaultValue={booking?.shareSauna || false}
            render={({ field }) => (
              <Checkbox
                {...field}
                value={undefined}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </label>

        {/* <Controller
          name='shareSauna'
          control={control}
          defaultValue={booking?.shareSauna}
          render={({ field }) => (
            <Checkbox
              {...field}
              value={undefined}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        /> */}

        {/* <Text size='2'>
          <Flex gap='2'> */}
        {/* <Checkbox
              //defaultValue={booking?.shareSauna}
              defaultValue={true}
              control={control} 
               name='shareSauna'
              // {...register("shareSauna")}
            />  */}
        {/* Dela bastu
          </Flex>
        </Text> */}

        <ErrorMessage>{errors.message?.message}</ErrorMessage>
        <Controller
          name='message'
          control={control}
          // defaultValue={booking?.message}
          render={({ field }) => (
            <SimpleMDE placeholder='Meddelande' {...field} />
          )}
        />
        {/* <TextFieldInput
          defaultValue='kjhlkjhlkjhlkj'
          {...register("message")}
        /> */}

        <ErrorMessage>{errors.message?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type='submit'>
          {booking ? "Uppdatera bookning" : "Boka"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default SaunaForm;
