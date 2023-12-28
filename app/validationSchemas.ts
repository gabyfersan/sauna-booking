import { z } from "zod";

const dateRegex =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):00$/;

export const saunaSchema = z.object({
  bookedAtDateAndTime: z.string().refine((val) => dateRegex.test(val), {
    message: "Invalid date format",
  }),
  message: z.string().min(0).max(255, "Längden ska vara max vara 65535 tecken").optional(),
  shareSauna: z.boolean().optional(),
  bookedByUserId: z
  .string()
  .min(1, "Längden ska vara minst vara 1 tecken")
  .max(255, "Längden ska vara max vara 255 tecken")
});

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Längden ska vara minst vara 1 tecken")
    .max(255, "Längden ska vara max vara 255 tecken"),
  description: z
    .string()
    .min(1)
    .max(65535, "Längden ska vara max vara 65535 tecken"),
});

export const patchIssueSchema = z.object({
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
});
