"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { userFormSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Button, Callout, Card, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UserFormData = z.infer<typeof userFormSchema>;

const IssueForm = ({ user }: { user?: User }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });
  const [error, setError] = useState<string>("");
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (user) {
        await axios.patch(`/api/users/${user.id}`, data);
      } else {
        await axios.post("/api/users/register", data);
        toast.success("Konto är skapad");
      }
      router.push("/");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  });
  return (
    <div className='  flex justify-center items-center '>
      <Card size='5' className=' md:w-2/5'>
        {error && (
          <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form className='space-y-3' onSubmit={onSubmit}>
          <Text>Epost</Text>
          <TextField.Root>
            <TextField.Input
              defaultValue={user?.email!}
              placeholder='Epost'
              {...register("email")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <Text size='3'>Lösenord</Text>
          <TextField.Root>
            <TextField.Input placeholder='Lösenord' {...register("password")} />
          </TextField.Root>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            {user ? "Uppdatera" : "Skapa nytt konto"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default IssueForm;
