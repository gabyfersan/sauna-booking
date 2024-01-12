import { z } from "zod";

const strictErrorMessage = "Data innåller värden som inte är definierad";
export const userFormSchema = z
  .object({
    password: z
      .string()
      .refine((value) => value.length >= 6, {
        message: "Lösenordet måste vara minst 6 tecken långt",
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: "Lösenordet måste innehålla minst en bokstav",
      })
      .refine((value) => /\d/.test(value), {
        message: "Lösenordet måste innehålla minst en siffra",
      }),

    email: z.string().email("Detta är inte en giltig e-postadress"),
  })
  .strict(strictErrorMessage);

export const userDateBaseSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().optional(),
    email: z.string().optional(),
    emailVerified: z.date().optional(),
    image: z.string().optional(),
    hashedPassword: z.string().optional(),
    role: z.string().optional(),
  })
  .strict(strictErrorMessage);

const dateRegex =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):00:00.000Z$/;

export const patchSaunaSchema = z
  .object({
    message: z
      .string()
      .min(0)
      .max(255, "Längden ska vara max vara 255 tecken")
      .optional(),

    shareSauna: z.boolean().optional(),
  })
  .strict(strictErrorMessage);

//saunaSchema.merge(z.object({ id: z.number() }));

export const saunaSchema = patchSaunaSchema
  .merge(
    z.object({
      bookedAtDateAndTime: z.string().refine((val) => dateRegex.test(val), {
        message: "Invalid date format",
      }),
      // message: z
      //   .string()
      //   .min(0)
      //   .max(255, "Längden ska vara max vara 65535 tecken")
      //   .optional(),
      // shareSauna: z.boolean().optional(),
      bookedByUserId: z
        .string()
        .min(1, "Längden ska vara minst vara 1 tecken")
        .max(255, "Längden ska vara max vara 255 tecken"),
    })
  )
  .strict(strictErrorMessage);

export const saunaDateBaseSchema = saunaSchema
  .merge(
    z.object({
      createdAt: z.date(),
      updatedAt: z.date(),
      id: z.number(),
    })
  )
  .strict(strictErrorMessage);

export const issueSchema = z
  .object({
    title: z
      .string()
      .min(1, "Längden ska vara minst vara 1 tecken")
      .max(255, "Längden ska vara max vara 255 tecken"),
    description: z
      .string()
      .min(1)
      .max(65535, "Längden ska vara max vara 65535 tecken"),
  })
  .strict(strictErrorMessage);

export const patchIssueSchema = z
  .object({
    title: z
      .string()
      .min(1, "Längden ska vara minst vara 1 tecken")
      .max(255, "Längden ska vara max vara 255 tecken")
      .optional(),
    description: z
      .string()
      .min(1)
      .max(65535, "Längden ska vara max vara 65535 tecken")
      .optional(),
    assignedToUserId: z
      .string()
      .min(1, "Längden ska vara minst vara 1 tecken")
      .max(255, "Längden ska vara max vara 255 tecken")
      .optional()
      .nullable(),
  })
  .strict(strictErrorMessage);
